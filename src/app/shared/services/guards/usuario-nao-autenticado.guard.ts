import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WppService } from '../wpp.service';

//https://balta.io/blog/login-logout-protecao-de-rotas-envio-de-tokens-com-angular

@Injectable({
  providedIn: 'root'
})
export class UsuarioNaoAutenticadoGuard implements CanActivate{
    constructor(
      private wppService: WppService,
      private router: Router) { }

    canActivate(){
      if (this.wppService.logado) {
        this.router.navigate(['home']);
        return false;
      }

      return true;
    }
}
