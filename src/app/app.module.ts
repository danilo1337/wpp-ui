import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './views/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './views/home/home.component';
import { UploadDialogComponent } from './views/upload-dialog/upload-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MenuComponent } from './views/menu/menu.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ProcessamentoComponent } from './views/processamento/processamento.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JwtInterceptor } from './shared/services/interceptors/jwt.interceptor';
import { GestaoUsuarioComponent } from './views/gestao-usuario/gestao-usuario.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UploadDialogComponent,
    MenuComponent,
    ProcessamentoComponent,
    GestaoUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,

    MatFormFieldModule, 
    MatInputModule,
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,

    MatSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  title = 'verifica-wpp'
}
