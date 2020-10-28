import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { Router } from '@angular/router';
import { AuthService } from '@vc-auth/authentication.module';
import { HttpResponse } from '@angular/common/http';
import { AppUser } from '@vc-shared/shared.module';
import { of } from 'rxjs';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let authService: AuthService;

  const mockHttpLogin: HttpResponse<string> = {
    body: 'qwerty123456789',
    type: null,
    headers: null,
    clone: null,
    status: 200,
    statusText: 'Ok',
    url: null,
    ok: true
  };

  const mockHttpUser: HttpResponse<AppUser> = {
    body: {
      id: 1,
      firstName: 'Marcin',
      lastName: 'Test'
    },
    type: null,
    headers: null,
    clone: null,
    status: 200,
    statusText: 'Ok',
    url: null,
    ok: true
  };

  const authServiceMock: Partial<AuthService> = {
    login: () => of(mockHttpLogin),
    getUserInfoFromSrv: () => of(mockHttpUser)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to courses page', () => {
    component.onLoginSubmit();
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toEqual(['/courses']);
  });

});
