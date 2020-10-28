import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClientStatusService } from '../services/http-client-status.service';
import { AppState } from 'src/app/app.states';
import { Store } from '@ngrx/store';
import { showLoader, hideLoader } from '@vc-core/store/actions';

@Injectable()
export class StatusClientUpdateInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.store.dispatch(showLoader());

    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.success) { }
          this.store.dispatch(hideLoader());
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.store.dispatch(hideLoader());
        }
        throw err;
      }));

  }
}
