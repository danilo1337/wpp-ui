import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class WppService {

  constructor(private http: HttpClient) { }

  uploadArquivo(file: File) : Observable<HttpEvent<any>>{
    const formData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST',`${environment.URL_WPP_API}/contatos/arquivo/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
    
  }

}
