import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import { Course } from '../models/course';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected courses', () => {
    const courses = service.getList();
    expect(courses).toBeTruthy();
  });

  it('should remove expected course', () => {
    const courses = service.getList();
    const beforeDeleteLength = courses.length;
    service.removeItem(courses[0].id);
    expect(beforeDeleteLength).toBeGreaterThan(service.getList().length);
  });

  it('should create new course', () => {
    const coursesLengthBeforeInsert = service.getList().length;
    service.createCourse({
      id: null,
      title: 'Test',
      description: 'Test Description',
      creationDate: new Date(),
      topRated: false,
      duration: 100 });
    expect(coursesLengthBeforeInsert).toBeLessThan(service.getList().length);
  });

  it('should update a course', () => {
    const course = service.getList()[1];
    const coursesLength = service.getList().length;
    service.updateItem(course.id, 'Test Test Test', undefined, undefined, true);
    expect(coursesLength).toBe(service.getList().length);
    const updated = service.getItemById(course.id);
    expect(updated.title).toBe('Test Test Test');
    expect(updated.duration).toBe(course.duration);
    expect(updated.description).toBe(course.description);
    expect(updated.topRated).toBeTrue();
  });
});
