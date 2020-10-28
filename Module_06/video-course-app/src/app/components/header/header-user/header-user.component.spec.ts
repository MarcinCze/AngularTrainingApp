import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeaderUserComponent } from './header-user.component';
import { AuthService } from '../../../services/auth.service';
import { AppUser } from '../../../models/app-user';
import { By } from '@angular/platform-browser';

describe('HeaderUserComponent', () => {
  let component: HeaderUserComponent;
  let fixture: ComponentFixture<HeaderUserComponent>;
  let router: Router;
  let authService: AuthService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const referenceAppUser: AppUser = {
    id: 1,
    firstName: 'TestFirst',
    lastName: 'TestLast'
  };

  const authServiceMock: Partial<AuthService> = {
    logout: () => null,
    getUserInfo: () => referenceAppUser
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderUserComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUserComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper user name', () => {
    expect(
      fixture.debugElement.query(
        By.css('.user-btn.left>button')
      ).nativeElement.textContent).toContain(
        `${referenceAppUser.firstName} ${referenceAppUser.lastName}`
      );
  });

  it('should redirect after logoff', () => {
    component.onLogoffLinkClick();
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toEqual(['/login']);
  });

  it('should emit onLogoffLinkClick once clicked', () => {
    const spy = spyOn(component, 'onLogoffLinkClick');
    fixture.debugElement.query(By.css('.user-btn.right>button')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
