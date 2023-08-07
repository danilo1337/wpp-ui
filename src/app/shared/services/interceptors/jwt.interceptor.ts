import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WppService } from '../wpp.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private wppService: WppService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.wppService.obterTokenUsuario
    const isApiUrl = request.url.startsWith(`${environment.LOCAL_URL}`);

    if (token && !isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('Houve um erro de autenticação');
          this.wppService.deslogar();
        }
        return throwError(error);
      })
    );

  }

}
