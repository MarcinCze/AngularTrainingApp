import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesListComponent } from './courses-list.component';
import { CourseService } from '@vc-course/course.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CourseItemComponent } from '../course-item/course-item.component';
import { ConfirmationModalComponent } from '@vc-widgets/widgets.module';
import { DurationPipe, VideoCourse } from '@vc-shared/shared.module';
import { CoursesListToolsComponent } from '../courses-list-tools/courses-list-tools.component';
import { of } from 'rxjs/internal/observable/of';
import { HttpResponse } from '@angular/common/http';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let courseService: CourseService;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const httpResponse: HttpResponse<{ courses: VideoCourse[] }> = {
    body: {
      courses: [
        {
          id: 1,
          title: 'Test Course 1',
          description: 'Test Course Description',
          creationDate: new Date('2018-02-01'),
          duration: 700,
          topRated: false,
          authors: []
        },
        {
          id: 2,
          title: 'Test Course 2',
          creationDate: new Date(),
          description: 'Test Course 2/2 Description',
          duration: 400,
          topRated: false,
          authors: []
        }]
    },
    type: null,
    headers: null,
    clone: null,
    status: 200,
    statusText: 'Ok',
    url: null,
    ok: true
  };

  const httpResponseRemove: HttpResponse<VideoCourse> = {
    body: {
      id: 1,
      title: 'Test Course 1',
      description: 'Test Course Description',
      creationDate: new Date('2018-02-01'),
      duration: 700,
      topRated: false,
      authors: []
    },
    type: null,
    headers: null,
    clone: null,
    status: 200,
    statusText: 'Ok',
    url: null,
    ok: true
  };

  const courseServiceMock: Partial<CourseService> = {
    getList: () => of(httpResponse),
    increasePageNumber: () => null,
    removeItem: (id: number) => of(httpResponseRemove),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        CourseItemComponent,
        ConfirmationModalComponent,
        DurationPipe,
        CoursesListToolsComponent
      ],
      providers: [
        { provide: CourseService, useValue: courseServiceMock },
        { provide: Router, useValue: routerSpy }
      ],
      imports: [RouterTestingModule.withRoutes([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    courseService = fixture.debugElement.injector.get(CourseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate courses from service', () => {
    expect(component.courses).toBeTruthy();
    expect(component.courses.length).toBe(2);
    expect(component.courses[0].title).toBe('Test Course 1');
    expect(component.courses[1].title).toBe('Test Course 2');
  });

  it('should emit onLoadMoreClick once clicked', () => {
    const spy = spyOn(component, 'onLoadMoreClick');
    fixture.debugElement.query(By.css('.load-container>button')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should log message once called onLoadMoreClick', () => {
    const consoleSpy = spyOn(console, 'log');
    component.onLoadMoreClick();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should navigate to edit course page', () => {
    const course = new VideoCourse();
    course.id = 12;
    component.onCourseEditClick(course);
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toEqual(['/courses/12']);
  });

  it('should download courses', () => {
    component.ngOnInit();
    expect(component.courses).toEqual(httpResponse.body.courses);
    component.loadCourses();
    expect(component.courses).toEqual(httpResponse.body.courses);
    expect(component.loadMoreVisible).toBeTrue();
  });

  it('should prepare confirmation window for delete', () => {
    const course = new VideoCourse();
    course.id = 1;
    course.title = 'Test Course 1';
    expect(component.confIsVisible).toBeFalsy();
    component.onCourseDeleteClick(course);
    expect(component.confIsVisible).toBeTrue();
    expect(component.confModalTitle).toContain('Confirmation');
    expect(component.confModalMessage).toContain('Are you sure to remove course Test Course 1?');
  });

  it('should make proper action when onDeleteConfirmationReceived(true)', () => {
    component.ngOnInit();
    const course = new VideoCourse();
    course.id = 1;
    course.title = 'Test Course 1';
    component.onCourseDeleteClick(course);
    component.onDeleteConfirmationReceived(true);
    expect(component.confIsVisible).toBeFalse();
    expect(component.confModalTitle).toBeFalsy();
    expect(component.confModalMessage).toBeFalsy();
    expect(component.courses.length).toEqual(1);
    expect(component.courses[0].id).toEqual(2);
  });

  it('should make proper action when onDeleteConfirmationReceived(false)', () => {
    component.ngOnInit();
    const course = new VideoCourse();
    course.id = 1;
    course.title = 'Test Course 1';
    component.onCourseDeleteClick(course);
    component.onDeleteConfirmationReceived(false);
    expect(component.confIsVisible).toBeFalse();
    expect(component.confModalTitle).toBeFalsy();
    expect(component.confModalMessage).toBeFalsy();
    expect(component.courses.length).toEqual(2);
    expect(component.courses[0].id).toEqual(1);
    expect(component.courses[1].id).toEqual(2);
  });

  it('should display message when no courses', () => {
    component.courses = new Array<VideoCourse>();
    fixture.detectChanges();
    expect(component.courses.length).toEqual(0);
    const containerEl = fixture.debugElement.query(By.css('.no-data-container')).nativeElement;
    expect(containerEl.textContent).toContain('No data. Feel free to add a new course');
  });

  it('should not display any message when there are courses', () => {
    expect(component.courses.length).toEqual(2);
    expect(fixture.debugElement.query(By.css('.no-data-container'))).toBeFalsy();
  });
});
