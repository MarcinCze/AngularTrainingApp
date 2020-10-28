import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let authService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    router = TestBed.inject(Router);
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for a logged in user', () => {
    authService = { isAuthenticated: () => true };
    guard = new AuthGuard(authService, router);
    expect(guard.canActivate(null, null)).toBeTrue();
  });

  it('should return false for a not logged in user', () => {
    authService = { isAuthenticated: () => false };
    guard = new AuthGuard(authService, router);
    expect(guard.canActivate(null, null)).toBeFalse();
  });
});
