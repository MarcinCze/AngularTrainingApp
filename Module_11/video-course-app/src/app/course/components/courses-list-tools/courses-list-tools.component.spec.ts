import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesListToolsComponent } from './courses-list-tools.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('CoursesListToolsComponent', () => {
  let component: CoursesListToolsComponent;
  let fixture: ComponentFixture<CoursesListToolsComponent>;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListToolsComponent],
      providers: [{ provide: Router, useValue: routerSpy }]
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

  it('should call onAddBtnClick function', () => {
    const spy = spyOn(component, 'onAddBtnClick');
    fixture.debugElement.query(By.css('#btnAddNew')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to new course page', () => {
    component.onAddBtnClick();
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toEqual(['/courses/new']);
  });
});
