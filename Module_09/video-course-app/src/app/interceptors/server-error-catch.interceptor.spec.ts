import { TestBed } from '@angular/core/testing';

import { ServerErrorCatchInterceptor } from './server-error-catch.interceptor';

describe('ServerErrorCatchInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ServerErrorCatchInterceptor
      ]
  }));

  // it('should be created', () => {
  //   const interceptor: ServerErrorCatchInterceptor = TestBed.inject(ServerErrorCatchInterceptor);
  //   expect(interceptor).toBeTruthy();
  // });
});
