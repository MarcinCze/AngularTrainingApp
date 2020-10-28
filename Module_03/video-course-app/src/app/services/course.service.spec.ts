import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import { ICourse } from '../models/icourse';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create courses list', () => {
    const courses: Array<ICourse> = service.getCourses();
    expect(courses).toBeTruthy();
    expect(courses.length).toBe(4);
  });
});
