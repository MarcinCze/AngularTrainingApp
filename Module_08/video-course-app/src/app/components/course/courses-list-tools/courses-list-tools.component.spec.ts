import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListToolsComponent } from './courses-list-tools.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('CoursesListToolsComponent', () => {
  let component: CoursesListToolsComponent;
  let fixture: ComponentFixture<CoursesListToolsComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListToolsComponent],
      imports: [RouterTestingModule.withRoutes([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListToolsComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onSearchBtnClick once clicked', () => {
    const spy = spyOn(component, 'onSearchBtnClick');
    fixture.debugElement.query(By.css('#btnSearch')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should log message once called onSearchBtnClick', () => {
    const consoleSpy = spyOn(console, 'log');
    component.onSearchBtnClick();
    expect(consoleSpy).toHaveBeenCalled();
  });
});
