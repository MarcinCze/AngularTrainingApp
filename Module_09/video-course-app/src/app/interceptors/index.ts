import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestHeaderInterceptor } from './request-header.interceptor';
import { StatusClientUpdateInterceptor } from './status-client-update.interceptor';
import { ServerErrorCatchInterceptor } from './server-error-catch.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: StatusClientUpdateInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: RequestHeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ServerErrorCatchInterceptor, multi: true }
];
