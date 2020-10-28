import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCourseComponent } from './edit-course.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '@vc-course/course.module';
import { VideoCourse, DurationPipe, Author, AuthorPipe } from '@vc-shared/shared.module';
import { DurationControlComponent, DateControlComponent, AuthorsControlComponent } from '@vc-widgets/widgets.module';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

describe('EditCourseComponent - EditMode', () => {
  let component: EditCourseComponent;
  let fixture: ComponentFixture<EditCourseComponent>;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let courseService: CourseService;

  const responseGetItem: HttpResponse<VideoCourse> = {
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

  const responseGetList: HttpResponse<{ courses: VideoCourse[] }> = {
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

  const responseGetAuthors: HttpResponse<Author[]> = {
    body: [
      { firstName: 'Test', lastName: 'Test' },
      { firstName: 'Test2', lastName: 'Test2' }
    ],
    type: null,
    headers: null,
    clone: null,
    status: 200,
    statusText: 'Ok',
    url: null,
    ok: true
  }

  const courseServiceMock: Partial<CourseService> = {
    getItemById: () => of(responseGetItem),
    getList: () => of(responseGetList),
    createItem: (newCourse: VideoCourse) => of(responseGetItem),
    updateItem: (course: VideoCourse) => of(responseGetItem),
    getAuthors: () => of(responseGetAuthors),
    setPageNumber: () => null,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditCourseComponent,
        DurationControlComponent,
        DateControlComponent,
        AuthorsControlComponent,
        DurationPipe,
        AuthorPipe
      ],
      providers: [
        { provide: CourseService, useValue: courseServiceMock },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  switch (key) {
                    case 'id':
                      return 1;
                  }
                }
              }
            }
          },
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    courseService = fixture.debugElement.injector.get(CourseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call prepareAsEditCourse function', () => {
    component.ngOnInit();
    expect(component.pageTitle).toContain('Edit');
  });

  it('should set proper course', () => {
    component.ngOnInit();
    expect(component.courseId).toEqual(responseGetItem.body.id);
    expect(component.course).toEqual(responseGetItem.body);
    expect(component.courseForm.value.title).toContain(responseGetItem.body.title);
    expect(component.courseForm.value.description).toContain(responseGetItem.body.description);
  });

  it('should redirect onCancel click', () => {
    component.onCancelClick();
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toEqual(['/courses']);
  });

  it('should redirect onSubmit click', () => {
    component.onSubmit();
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toEqual(['/courses']);
  });

  it('should call updateCourse function', () => {
    const getDataSpy = spyOn(courseService, 'updateItem');
    component.onSubmit();
    expect(getDataSpy).toHaveBeenCalled();
  });

  it('should emit onCancelClick once clicked', () => {
    const spy = spyOn(component, 'onCancelClick');
    fixture.debugElement.query(By.css('button.btn.blue.btn-cancel')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should copy from form to class proper data', () => {
    component.courseForm.patchValue({
      title: 'Test Course',
      description: 'Test Course Description',
      creationDate: new DatePipe('en-US').transform('2020-05-01', 'dd/MM/yyyy'),
      duration: 120,
      authors: [{firstName: 'Test', lastName: 'Test'}]
    });
    component.onSubmit();
    expect(component.course.title).toEqual(component.courseForm.value.title);
    expect(component.course.description).toEqual(component.courseForm.value.description);
    expect(component.course.creationDate).toEqual(new Date('2020-05-01'));
    expect(component.course.duration).toEqual(component.courseForm.value.duration);
    expect(component.course.authors).toEqual(component.courseForm.value.authors);
  });
});
