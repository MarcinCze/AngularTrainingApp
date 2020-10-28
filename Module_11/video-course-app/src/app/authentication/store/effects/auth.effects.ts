import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { tap, exhaustMap, map, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { AuthActions, loginSuccess, loginFailure, getUser, getUserSuccess, initLoadDone } from '../actions';

@Injectable()
export class AuthEffects {

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => {
      console.log(`%c EFFECT ${AuthActions.logout} `, 'background: #222; color: #bada55');
      this.authService.logout();
      this.router.navigateByUrl('/login');
    })
  ), { dispatch: false });

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    tap(() => console.log(`%c EFFECT ${AuthActions.login} `, 'background: #222; color: #bada55')),
    exhaustMap(action => this.authService.login(action['username'], action['password'])
      .pipe(
        map(response => (loginSuccess({ token: response.body }))),
        catchError((error) => of(loginFailure({ exception: error })))
      ))
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    tap(() => console.log(`%c EFFECT ${AuthActions.loginSuccess} `, 'background: #222; color: #bada55')),
    map(() => getUser())
  ));

  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.getUser),
    tap(() => console.log(`%c EFFECT ${AuthActions.getUser} `, 'background: #222; color: #bada55')),
    exhaustMap(() => this.authService.getUserInfoFromSrv()
      .pipe(
        map(response => (getUserSuccess({ user: response.body })))
      )
    )
  ));

  getUserSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.getUserSuccess),
    tap(() => {
      console.log(`%c EFFECT ${AuthActions.getUserSuccess} `, 'background: #222; color: #bada55');
      this.router.navigateByUrl('/courses');
    })
  ), { dispatch: false });

  initLoad$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.initLoad),
    tap(() => console.log(`%c EFFECT ${AuthActions.initLoad} `, 'background: #222; color: #bada55')),
    exhaustMap(() => this.authService.accessData
      .pipe(
        map(response => (initLoadDone(response)))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router) { }
}
