import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WppService } from 'src/app/shared/services/wpp.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  ehAdministrador: boolean = false;

  constructor(
    private router: Router,
    private wppService: WppService
    ){}

  ngOnInit(): void {
    this.ehAdministrador = this.wppService.ehUsuarioAdministrador
  }

  logout(): void{
    this.wppService.logout();
  }
}
