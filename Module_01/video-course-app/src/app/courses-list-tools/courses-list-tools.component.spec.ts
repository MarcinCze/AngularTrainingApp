import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListToolsComponent } from './courses-list-tools.component';

describe('CoursesListToolsComponent', () => {
  let component: CoursesListToolsComponent;
  let fixture: ComponentFixture<CoursesListToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesListToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
