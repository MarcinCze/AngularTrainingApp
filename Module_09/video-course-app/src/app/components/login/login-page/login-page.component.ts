import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  errorMessage: string;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(50)])
  });

  constructor(private authService: AuthService, private router: Router) { }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit(): void {
  }

  onLoginSubmit(): void {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        resp => {
          this.authService.getUserInfoFromSrv()
            .subscribe(userResp => {
              if (this.authService.isAuthenticated) {
                this.router.navigate(['/courses']);
              }
            });
        },
        error => {
          this.errorMessage = error;
        });
  }
}
