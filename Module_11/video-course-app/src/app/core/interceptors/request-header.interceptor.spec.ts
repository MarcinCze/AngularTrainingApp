import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RequestHeaderInterceptor } from './request-header.interceptor';
import { CourseService } from '@vc-course/course.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('RequestHeaderInterceptor', () => {
  let httpMock: HttpTestingController;
  let service: CourseService;
  const srvUrl = 'https://api-video-course.azurewebsites.net/api';
  const lsTokenKey = 'VC_Token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CourseService,
        { provide: HTTP_INTERCEPTORS, useClass: RequestHeaderInterceptor, multi: true },
      ]
    });

    service = TestBed.get(CourseService);
    httpMock = TestBed.get(HttpTestingController);
    localStorage.setItem(lsTokenKey, 'qwerty123456789');
  });

  // it('should add an Authorization header', () => {
  //   service.getList().subscribe(response => {
  //     expect(response).toBeTruthy();
  //   });

  //   const httpRequest = httpMock.expectOne(`${srvUrl}/courses/4/1`);
  //   expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  // });

  // it('should have proper token inside', () => {
  //   service.getList().subscribe(response => {
  //     expect(response).toBeTruthy();
  //   });

  //   const httpRequest = httpMock.expectOne(`${srvUrl}/courses/4/1`);
  //   expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  //   expect(httpRequest.request.headers.get('Authorization')).toBe('Bearer qwerty123456789');
  // });
});
