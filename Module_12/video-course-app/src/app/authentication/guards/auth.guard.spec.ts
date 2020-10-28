import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '@vc-auth/authentication.module';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const authServiceMock: Partial<AuthService> = {
    isLogged: of(false)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceMock }
      ]
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

  it('should return false for a not logged in user', () => {
    guard.canActivate(null, null).subscribe(result => expect(result).toBeFalse());
  });

  it('should redirect to login page', () => {
    guard.canActivate(null, null).subscribe();
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toEqual(['/login']);
  });
});
