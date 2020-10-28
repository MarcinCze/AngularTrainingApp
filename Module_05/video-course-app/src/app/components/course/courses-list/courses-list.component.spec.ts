import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesListComponent } from './courses-list.component';
import { CourseService } from '../../../services/course.service';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let courseService: CourseService;
  const courseServiceMock: Partial<CourseService> = {
    getList: () => [
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
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListComponent],
      providers: [{ provide: CourseService, useValue: courseServiceMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    courseService = fixture.debugElement.injector.get(CourseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call CourseService', () => {
  //   const getDataSpy = spyOn(courseService, 'getCoursesFromJson');
  //   component.ngOnInit();
  //   expect(getDataSpy).toHaveBeenCalled();
  // });

  // it('should populate courses from service', () => {
  //   expect(component.courses).toBeTruthy();
  //   expect(component.courses.length).toBe(2);
  //   expect(component.courses[0].title).toBe('Test Course 1');
  //   expect(component.courses[1].title).toBe('Test Course 2');
  // });

  // it('should emit onLoadMoreClick once clicked', () => {
  //   const spy = spyOn(component, 'onLoadMoreClick');
  //   fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
  //   fixture.detectChanges();
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('should log message once called onLoadMoreClick', () => {
  //   const consoleSpy = spyOn(console, 'log');
  //   component.onLoadMoreClick();
  //   expect(consoleSpy).toHaveBeenCalled();
  // });

  // it('should log message once called onCourseEditClick', () => {
  //   const consoleSpy = spyOn(console, 'log');
  //   component.onCourseEditClick(null);
  //   expect(consoleSpy).toHaveBeenCalled();
  // });

  // it('should log message once called onCourseDeleteClick', () => {
  //   const consoleSpy = spyOn(console, 'log');
  //   component.onCourseDeleteClick(null);
  //   expect(consoleSpy).toHaveBeenCalled();
  // });
});
