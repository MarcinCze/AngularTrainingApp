import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPageComponent } from './login-page.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth.service';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  // let router: Router;
  let mockRouter;
  let authService: AuthService;

  const authServiceMock: Partial<AuthService> = {
    isAuthenticated: () => true,
    login: (login: string, password: string) => null,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: mockRouter }
      ],
      // imports: [RouterTestingModule.withRoutes([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    // router = TestBed.inject(Router);
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
