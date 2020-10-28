import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, flatMap } from 'rxjs/operators';
import { AppState } from 'src/app/app.states';

@Injectable()
export class RequestHeaderInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(state => state.auth.token)
      .pipe(
        first(),
        flatMap(token => {
          const authReq = !!token ? request.clone({ setHeaders: { Authorization: 'Bearer ' + token } }) : request;
          return next.handle(authReq);
        })
      );
  }
}
