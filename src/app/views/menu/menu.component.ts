import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WppService } from 'src/app/shared/services/wpp.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(
    private router: Router,
    private wppService: WppService
    ){}

  logout(): void{
    this.wppService.logout();
  }
}
