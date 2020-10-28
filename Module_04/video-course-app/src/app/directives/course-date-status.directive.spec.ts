import { CourseDateStatusDirective } from './course-date-status.directive';
import { CourseComponent } from '../course/course.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { Course } from '../models/course';
import { DurationPipe } from '../pipes/duration.pipe';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CourseDateStatusDirective', () => {

  const freshCourseColor = '9, 228, 20';
  const upcomingCourseColor = '11, 142, 230';
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  let inputEl: DebugElement;

  const normalCourseItem: Course = {
    id: 1,
    title: 'Test Course',
    duration: 150,
    description: 'Test course description',
    creationDate: new Date('2020-02-28'),
    topRated: false
  };

  const freshCourseItem: Course = {
    id: 2,
    title: 'Test Course',
    duration: 150,
    description: 'Test course description',
    creationDate: new Date(),
    topRated: false
  };

  const upcomingCourseItem: Course = {
    id: 3,
    title: 'Test Course',
    duration: 150,
    description: 'Test course description',
    creationDate: new Date(2025, 0, 1),
    topRated: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent, CourseDateStatusDirective, DurationPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    const directive = new CourseDateStatusDirective(null);
    expect(directive).toBeTruthy();
  });

  it('should be normal card border', () => {
    component.course = normalCourseItem;
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(By.css('.course-container'));
    expect(inputEl.nativeElement.style['box-shadow']).toBe('');
  });

  it('should be fresh card border', () => {
    component.course = freshCourseItem;
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(By.css('.course-container'));
    expect(inputEl.nativeElement.style['box-shadow']).toContain(freshCourseColor);
  });

  it('should be upcoming card border', () => {
    component.course = upcomingCourseItem;
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(By.css('.course-container'));
    expect(inputEl.nativeElement.style['box-shadow']).toContain(upcomingCourseColor);
  });
});
