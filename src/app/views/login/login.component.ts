import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WppService } from 'src/app/shared/service/wpp.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private wppService: WppService
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
          console.error('Erro de autenticação:', error);
        }
      );
    }

  }
}
