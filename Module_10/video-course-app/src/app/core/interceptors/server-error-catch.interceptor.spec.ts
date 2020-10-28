import { TestBed } from '@angular/core/testing';

import { ServerErrorCatchInterceptor } from './server-error-catch.interceptor';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { CourseService } from '@vc-course/course.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';


describe('ServerErrorCatchInterceptor', () => {
  let httpMock: HttpTestingController;
  let service: CourseService;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const srvUrl = 'https://api-video-course.azurewebsites.net/api/courses';
  const lsTokenKey = 'VC_Token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CourseService,
        { provide: Router, useValue: routerSpy },
        { provide: HTTP_INTERCEPTORS, useClass: ServerErrorCatchInterceptor, multi: true },
      ]
    });

    service = TestBed.get(CourseService);
    httpMock = TestBed.get(HttpTestingController);
    router = TestBed.inject(Router);
  });

  it('should catch error and navigate to error page - httpCode: 500', () => {
    service.getList()
      .subscribe(
        response => { },
        error => {
          const spy = router.navigate as jasmine.Spy;
          expect(spy.calls.first().args[0]).toEqual(['/error']);
        });

    const req = httpMock.expectOne(`${srvUrl}/4/1`);
    expect(req.request.method).toBe("GET");
    req.flush('Invalid credentials', { status: 500, statusText: 'Server Error' });
  });

  it('should catch error and navigate to error page - httpCode: 507', () => {
    service.getList()
      .subscribe(
        response => { },
        error => {
          const spy = router.navigate as jasmine.Spy;
          expect(spy.calls.first().args[0]).toEqual(['/error']);
        });

    const req = httpMock.expectOne(`${srvUrl}/4/1`);
    expect(req.request.method).toBe("GET");
    req.flush('Invalid credentials', { status: 507, statusText: 'Insufficient Storage' });
  });

  it('should catch error and navigate to error page - httpCode: 0 (srv not accessible)', () => {
    service.getList()
      .subscribe(
        response => { },
        error => {
          const spy = router.navigate as jasmine.Spy;
          expect(spy.calls.first().args[0]).toEqual(['/error']);
        });

    const req = httpMock.expectOne(`${srvUrl}/4/1`);
    expect(req.request.method).toBe("GET");
    req.flush('Invalid credentials', { status: 0, statusText: null });
  });

  // TODO - Why router has [/error] path if the 'if' is not being even visited?! Why?!
  // it('should catch error and navigate to error page - httpCode: 401', () => {
  //   service.getList()
  //     .subscribe(
  //       response => { },
  //       error => {
  //         const spy = router.navigate as jasmine.Spy;
  //         expect(spy.calls.first()?.args[0]).toBeFalsy();
  //       });

  //   const req = httpMock.expectOne(`${srvUrl}/4/1`);
  //   expect(req.request.method).toBe("GET");
  //   req.flush('Invalid credentials', { status: 401, statusText: 'Not Authenticated' });
  // });

});
