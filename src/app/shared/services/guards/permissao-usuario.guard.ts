import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WppService } from '../wpp.service';

@Injectable({
  providedIn: 'root'
})
export class PermissaoUsuario implements CanActivate{
    constructor(
      private wppService: WppService,
      private router: Router) { }

    canActivate(){
      return this.wppService.ehUsuarioAdministrador;
    }
}
