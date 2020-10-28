import { CourseDateStatusDirective } from './course-date-status.directive';
import { CourseItemComponent } from '../components/course-item/course-item.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { Course, DurationPipe } from '@vc-shared/shared.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CourseDateStatusDirective', () => {

  const freshCourseColor = '9, 228, 20';
  const upcomingCourseColor = '11, 142, 230';
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  let inputEl: DebugElement;

  const normalCourseItem: Course = {
    id: 1,
    title: 'Test Course',
    duration: 150,
    description: 'Test course description',
    creationDate: new Date('2020-02-28'),
    topRated: false,
    authors: []
  };

  const freshCourseItem: Course = {
    id: 2,
    title: 'Test Course',
    duration: 150,
    description: 'Test course description',
    creationDate: new Date(),
    topRated: false,
    authors: []
  };

  const upcomingCourseItem: Course = {
    id: 3,
    title: 'Test Course',
    duration: 150,
    description: 'Test course description',
    creationDate: new Date(2025, 0, 1),
    topRated: false,
    authors: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseItemComponent, CourseDateStatusDirective, DurationPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
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
