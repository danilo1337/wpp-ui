import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WppService } from '../wpp.service';


//https://balta.io/blog/login-logout-protecao-de-rotas-envio-de-tokens-com-angular

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate{
    constructor(
      private wppService: WppService,
      private router: Router) { }

    canActivate(){
      if (this.wppService.logado) {
        return true;
      }

      this.router.navigate(['']);
      return false;
    }
}
