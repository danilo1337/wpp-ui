import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class WppService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET}`)
    });

    const body = `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    return this.http.post(`${environment.URL_WPP_API}/oauth/token`, body, { headers });
  }

  uploadArquivo(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${environment.URL_WPP_API}/contatos/arquivo/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);

  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
