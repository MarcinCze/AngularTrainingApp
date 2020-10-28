import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoCourse } from 'src/app/models/video-course';
import { CourseService } from 'src/app/services/course.service';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const referenceVideoCourse: VideoCourse = {
    id: 1,
    title: 'Test Course',
    description: 'Test Course Description',
    creationDate: new Date('2018-02-01'),
    duration: 700,
    topRated: false
  };

  const courseServiceMock: Partial<CourseService> = {
    getItemById: () => referenceVideoCourse
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

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should find proper EDIT url', () => {
  //   expect(component.isEditPage('/courses')).toBeFalse();
  //   expect(component.isEditPage('/courses/')).toBeFalse();
  //   expect(component.isEditPage('/courses/2')).toBeTrue();
  // });
});
