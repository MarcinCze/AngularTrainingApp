import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.states';
import { Store } from '@ngrx/store';
import { logout } from '@vc-auth/store/actions';

@Injectable()
export class ServerErrorCatchInterceptor implements HttpInterceptor {

  constructor(private router: Router, private store: Store<AppState>) { }

  private notAllowedErrorCodes = [0, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511];

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.error('Interceptor err', err);

          if(this.notAllowedErrorCodes.indexOf(err.status) !== -1) {
            console.log(`%c HTTP CODE ${err.status} NAVIGATE TO ERROR PAGE `, 'background: red; color: white');
            this.router.navigate(['/error']);
          }

          if(err.status === 401) {
            console.log(`%c HTTP CODE ${err.status} LOGGING OUT `, 'background: red; color: white');
            this.store.dispatch(logout());
          }

        }
        throw err;
      }));
  }
}
