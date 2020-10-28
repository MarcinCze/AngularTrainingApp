import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StatusClientUpdateInterceptor } from './status-client-update.interceptor';
import { CourseService } from '@vc-course/course.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientStatusService } from '../services/http-client-status.service';

describe('StatusClientUpdateInterceptor', () => {
  let httpMock: HttpTestingController;
  let courseService: CourseService;
  let httpStatusService: HttpClientStatusService;
  const srvUrl = 'https://api-video-course.azurewebsites.net/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CourseService, HttpClientStatusService,
        { provide: HTTP_INTERCEPTORS, useClass: StatusClientUpdateInterceptor, multi: true },
      ]
    });

    courseService = TestBed.get(CourseService);
    httpStatusService = TestBed.get(HttpClientStatusService);
    httpMock = TestBed.get(HttpTestingController);
  });

  // it('should set proper value of working status', () => {
  //   expect(courseService).toBeTruthy();
  //   expect(httpStatusService).toBeTruthy();
  //   expect(httpStatusService.isWorking).toBeFalse();

  //   courseService.getList()
  //     .subscribe(response => {
  //       expect(httpStatusService.isWorking).toBeFalse();
  //     })

  //   const req = httpMock.expectOne(`${srvUrl}/courses/4/1`);
  //   expect(req.request.method).toBe("GET");
  //   req.flush({ courses: [] });
  // });
});
