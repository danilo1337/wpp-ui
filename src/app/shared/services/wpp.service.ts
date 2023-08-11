import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { JWT } from '../models/jwt';
import { Usuario } from '../models/usuario';
import { Pagination } from '../models/pagination';


@Injectable({
  providedIn: 'root'
})
export class WppService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /*----------------------------------------------------WPP-API----------------------------------------------------*/

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
  
  consultarUsuarios():  Observable< Pagination<Usuario> >{
    return this.http.get< Pagination<Usuario> >(`${environment.URL_WPP_API}/usuarios/`);
  }

  /*----------------------------------------------------TOKEN----------------------------------------------------*/

  logout() {
    this.deslogar();
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  get obterTokenUsuario(): string | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      return token;
    }
    return null;
  }

  get logado(): boolean {
    return localStorage.getItem('access_token') ? true : false;
  }


  getJwt(token: string): JWT {

    const tokenSplit: any = token?.split('.');

    let jwt: JWT = JSON.parse(atob(tokenSplit[1]));

    return jwt;
  }


  get ehUsuarioAdministrador(): boolean {
    const token = this.obterTokenUsuario;

    if (!token) {
      return false;
    }

    let jwt: JWT = this.getJwt(token);
    return jwt.authorities.some(e => e === 'ROLE_ADMIN');
  }

  /*-------------------------------------------------------------------------------------------------------------*/

}
