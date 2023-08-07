import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WppService } from 'src/app/shared/services/wpp.service';
import { MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  message = '';
  durationInSeconds = 5;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private wppService: WppService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {

      const { username, password } = this.loginForm.value;

      this.wppService.login(username, password).subscribe(
        (response) => {
          const accessToken = response.access_token;
          localStorage.setItem('access_token',accessToken)
          this.router.navigate(['home']);
        },
        (error) => {
          this.showSnackBar('Usuário ou senha incorretos');
        }
      );
    }

  }

  showSnackBar(message: string): void{
    this.snackBar.open(message, 'fechar', {duration: this.durationInSeconds * 1000})
  }

}
