import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login } from '@vc-auth/store/actions/auth.actions';
import { AppState } from 'src/app/app.states';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginErrorMessage$: Observable<any>;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(50)])
  });

  constructor(private store: Store<AppState>) { }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit(): void {
    this.loginErrorMessage$ = this.store.select(state => state.auth.errorMessage);
  }

  onLoginSubmit(): void {
    this.store.dispatch(
      login({ username: this.loginForm.value.email, password: this.loginForm.value.password })
    );
  }
}
