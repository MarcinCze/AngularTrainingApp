import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Course } from '../models/course';

describe('CourseService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: CourseService;

  const expectedCourses: Course[] = [
    {
      id: 1,
      title: 'Test Course 1',
      creationDate: new Date(),
      description: 'Test Course 1/2 Description',
      duration: 900,
      topRated: false
    },
    {
      id: 2,
      title: 'Test Course 2',
      creationDate: new Date(),
      description: 'Test Course 2/2 Description',
      duration: 400,
      topRated: false
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CourseService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected courses', () => {
    service.getCoursesFromJson().subscribe(
      courses => expect(courses).toEqual(expectedCourses, 'should return expected courses'),
      fail
    );
    const req = httpTestingController.expectOne(service.coursesJsonUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedCourses);
  });

  it('should be OK returning no courses', () => {
    service.getCoursesFromJson().subscribe(
      courses => expect(courses.length).toEqual(0, 'should have empty courses array'),
      fail
    );
    const req = httpTestingController.expectOne(service.coursesJsonUrl);
    req.flush([]);
  });
});
