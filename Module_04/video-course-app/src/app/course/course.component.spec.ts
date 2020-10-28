import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseComponent } from './course.component';
import { DurationPipe } from '../pipes/duration.pipe';
import { By } from '@angular/platform-browser';
import { Course } from '../models/course';
import { CourseSearchResultPipe } from '../pipes/course-search-result.pipe';
import { DebugElement } from '@angular/core';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  const courseItem: Course = {
    id: 1,
    title: 'Test Course',
    duration: 150,
    description: 'Test course description',
    creationDate: new Date('2020-02-28'),
    topRated: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent, DurationPipe, CourseSearchResultPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    component.course = courseItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have course item', () => {
    expect(component.course).toBeTruthy();
    expect(component.course.title).toBe('Test Course');
  });

  it('should have proper title', () => {
    const courseTitleElement = fixture.debugElement.query(By.css('.course-title')).nativeElement;
    expect(courseTitleElement.textContent).toContain(courseItem.title.toUpperCase());
  });

  it('should have proper description', () => {
    const courseDescriptionElement = fixture.debugElement.query(By.css('.course-description')).nativeElement;
    expect(courseDescriptionElement.textContent).toContain(courseItem.description);
  });

  it('should have proper duration', () => {
    const courseDurationElement = fixture.debugElement.query(By.css('.course-duration')).nativeElement;
    expect(courseDurationElement.textContent).toContain('2h 30min');
  });

  it('should have proper date', () => {
    const courseDateElement = fixture.debugElement.query(By.css('.course-creation-date')).nativeElement;
    expect(courseDateElement.textContent).toContain('28 Feb, 2020');
  });

  it('should emit onEditClick once clicked', () => {
    const spy = spyOn(component, 'onEditClick');
    fixture.debugElement.query(By.css('.btn-edit')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit onDeleteClick once clicked', () => {
    const spy = spyOn(component, 'onDeleteClick');
    fixture.debugElement.query(By.css('.btn-delete')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should raise EDIT event when clicked', () => {
    let selectedCourse: Course;
    component.clickEdit.subscribe((c: Course) => selectedCourse = c);
    fixture.debugElement.query(By.css('.btn-edit')).triggerEventHandler('click', null);
    expect(selectedCourse).toBe(courseItem);
  });

  it('should raise DELETE event when clicked', () => {
    let selectedCourse: Course;
    component.clickDelete.subscribe((c: Course) => selectedCourse = c);
    fixture.debugElement.query(By.css('.btn-delete')).triggerEventHandler('click', null);
    expect(selectedCourse).toBe(courseItem);
  });

  it('should be visible', () => {
    const searchPipe = new CourseSearchResultPipe();
    expect(searchPipe.transform(courseItem.title, 'test')).toBeTrue();
  });

  it('should be visible', () => {
    const searchPipe = new CourseSearchResultPipe();
    expect(searchPipe.transform(courseItem.title, 'course')).toBeTrue();
  });

  it('should be visible', () => {
    const searchPipe = new CourseSearchResultPipe();
    expect(searchPipe.transform(courseItem.title, '')).toBeTrue();
  });

  it('should not be visible', () => {
    const searchPipe = new CourseSearchResultPipe();
    expect(searchPipe.transform(courseItem.title, 'marcin')).toBeFalse();
  });

  it('should top rated class be applied', () => {
    courseItem.topRated = true;
    fixture.detectChanges();
    const courseContainer: DebugElement = fixture.debugElement.query(By.css('.course-container'));
    expect(courseContainer.classes['top-rated']).toBeTruthy();
  });

  it('should top rated must not be applied', () => {
    courseItem.topRated = false;
    fixture.detectChanges();
    const courseContainer: DebugElement = fixture.debugElement.query(By.css('.course-container'));
    expect(courseContainer.classes['top-rated']).toBeFalsy();
  });

  it('should topRated star be visible', () => {
    courseItem.topRated = true;
    fixture.detectChanges();
    const starEl = fixture.debugElement.query(By.css('.fas.fa-star'))?.nativeElement;
    expect(starEl).toBeTruthy();
  });

  it('should topRated star be not visible', () => {
    courseItem.topRated = false;
    fixture.detectChanges();
    const starEl = fixture.debugElement.query(By.css('.fas.fa-star'))?.nativeElement;
    expect(starEl).toBeFalsy();
  });
});
