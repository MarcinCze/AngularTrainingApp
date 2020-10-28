import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoCourse } from '@vc-shared/shared.module';
import { CourseService } from '@vc-course/course.module';
import { of } from 'rxjs/internal/observable/of';
import { HttpResponse } from '@angular/common/http';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const httpResponse: HttpResponse<VideoCourse> = {
    body: {
      id: 1,
      title: 'Test Course',
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
    getItemById: () => of(httpResponse)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent],
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
          }
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should find proper EDIT url', () => {
  //   expect(component.isEditPage('/courses')).toBeFalse();
  //   expect(component.isEditPage('/courses/')).toBeFalse();
  //   expect(component.isEditPage('/courses/2')).toBeTrue();
  // });
});
