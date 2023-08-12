import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, } from '@angular/material/table';
import { Usuario } from 'src/app/shared/models/usuario';
import { WppService } from 'src/app/shared/services/wpp.service';

@Component({
  selector: 'app-gestao-usuario',
  templateUrl: './gestao-usuario.component.html',
  styleUrls: ['./gestao-usuario.component.css'],
})
export class GestaoUsuarioComponent implements AfterViewInit {

  message = '';
  durationInSeconds = 5;

  displayedColumns: string[] = ['nome', 'username', 'email', 'ativo', 'dataCriacao', 'dataAtualizacao'];
  dataSource: MatTableDataSource<Usuario>;

  usuarios: Usuario[] = [];

  pageSizeOptions = [5, 10, 25, 100];

  totalElements: number = 0;

  ativos = [
    { value: '', viewValue: 'Todos' },
    { value: 'S', viewValue: 'Ativo' },
    { value: 'N', viewValue: 'Inativo' }
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private wppService: WppService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(this.usuarios);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  consultar(_event: any): void {    

    this.wppService.consultarUsuarios(_event.pageIndex??0, _event.pageSize??5)
        .subscribe(pagination => {
          this.usuarios = pagination.content;
          this.dataSource = new MatTableDataSource(this.usuarios);
          this.totalElements = pagination.totalElements;
      },
      error =>  this.showSnackBar('Erro ao consultar usuários')
    );
  }
  
  showSnackBar(message: string): void{
    this.snackBar.open(message, 'fechar', {duration: this.durationInSeconds * 1000})
  }

}

