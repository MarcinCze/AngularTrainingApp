import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseComponent } from './edit-course.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { VideoCourse } from '../../../models/video-course';
import { DurationControlComponent } from '../../widgets/duration-control/duration-control.component';
import { DateControlComponent } from '../../widgets/date-control/date-control.component';
import { AuthorsControlComponent } from '../../widgets/authors-control/authors-control.component';
import { DurationPipe } from 'src/app/pipes/duration.pipe';

describe('EditCourseComponent - Insert Mode', () => {
  let component: EditCourseComponent;
  let fixture: ComponentFixture<EditCourseComponent>;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let courseService: CourseService;

  const referenceVideoCourse: VideoCourse = {
    id: 1,
    title: 'Test Course',
    description: 'Test Course Description',
    creationDate: new Date('2018-02-01'),
    duration: 700,
    topRated: false
  };

  const courseServiceMock: Partial<CourseService> = {
    getItemById: () => referenceVideoCourse,
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
    ],
    createCourse: () => null,
    updateItem: () => null
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditCourseComponent,
        DurationControlComponent,
        DateControlComponent,
        AuthorsControlComponent,
        DurationPipe
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
                      return null;
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

  // it('should call prepareAsNewCourse function', () => {
  //   component.ngOnInit();
  //   expect(component.title).toContain('Add');
  // });

  // it('should set proper (empty) course', () => {
  //   component.ngOnInit();
  //   expect(component.courseId).toEqual(-1);
  //   expect(component.course).toBeFalsy();
  //   expect(component.courseForm.value.title).toBeFalsy();
  //   expect(component.courseForm.value.description).toBeFalsy();
  // });

  // it('should redirect onCancel click', () => {
  //   component.onCancelClick();
  //   const spy = router.navigate as jasmine.Spy;
  //   const navArgs = spy.calls.first().args[0];
  //   expect(navArgs).toEqual(['/courses']);
  // });

  // it('should redirect onSubmit click', () => {
  //   component.onSubmit();
  //   const spy = router.navigate as jasmine.Spy;
  //   const navArgs = spy.calls.first().args[0];
  //   expect(navArgs).toEqual(['/courses']);
  // });

  // it('should call createCourse function', () => {
  //   const getDataSpy = spyOn(courseService, 'createCourse');
  //   component.onSubmit();
  //   expect(getDataSpy).toHaveBeenCalled();
  // });
});
