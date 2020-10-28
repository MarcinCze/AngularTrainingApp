import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesListComponent } from './courses-list.component';
import { CourseService } from '../../../services/course.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CourseItemComponent } from '../course-item/course-item.component';
import { ConfirmationModalComponent } from '../../widgets/confirmation-modal/confirmation-modal.component';
import { DurationPipe } from 'src/app/pipes/duration.pipe';
import { CoursesListToolsComponent } from '../courses-list-tools/courses-list-tools.component';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let courseService: CourseService;
  let router: Router;

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
      declarations: [
        CoursesListComponent,
        CourseItemComponent,
        ConfirmationModalComponent,
        DurationPipe,
        CoursesListToolsComponent
      ],
      providers: [{ provide: CourseService, useValue: courseServiceMock }],
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

  it('should call CourseService', () => {
    const getDataSpy = spyOn(courseService, 'getList');
    component.ngOnInit();
    expect(getDataSpy).toHaveBeenCalled();
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
});
