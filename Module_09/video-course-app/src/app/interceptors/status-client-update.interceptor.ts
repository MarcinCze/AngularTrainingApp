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

@Injectable()
export class StatusClientUpdateInterceptor implements HttpInterceptor {

  constructor(private clientService: HttpClientStatusService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.clientService.setStatus(true);

    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.success) { }
          this.clientService.setStatus(false);
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.clientService.setStatus(false);
        }
        throw err;
      }));

  }
}
