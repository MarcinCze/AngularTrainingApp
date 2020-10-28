import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderMainComponent } from './header-main.component';
import { AuthService } from '@vc-auth/authentication.module';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('HeaderMainComponent', () => {
  let component: HeaderMainComponent;
  let fixture: ComponentFixture<HeaderMainComponent>;
  let authService: AuthService;
  const authServiceMock: Partial<AuthService> = {
    isLogged: of(true)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderMainComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMainComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display HeaderUser and Breadcrumbs', () => {
    expect(fixture.debugElement.query(By.css('app-header-user'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-breadcrumbs'))).toBeTruthy();
  });
});
