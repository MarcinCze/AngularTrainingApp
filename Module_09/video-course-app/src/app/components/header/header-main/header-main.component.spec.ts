import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMainComponent } from './header-main.component';
import { AuthService } from '../../../services/auth.service';
import { By } from '@angular/platform-browser';
import { isatty } from 'tty';
import { HeaderLogoComponent } from '../header-logo/header-logo.component';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { Router } from '@angular/router';

describe('HeaderMainComponent', () => {
  let component: HeaderMainComponent;
  let fixture: ComponentFixture<HeaderMainComponent>;
  let authService: AuthService;
  let isAuth: boolean;
  const authServiceMock: Partial<AuthService> = {
    isAuthenticated: () => isAuth,
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
    isAuth = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-header-user'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-breadcrumbs'))).toBeTruthy();
  });

  it('should not display HeaderUser and Breadcrumbs', () => {
    isAuth = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-header-user'))).toBeNull();
    expect(fixture.debugElement.query(By.css('app-breadcrumbs'))).toBeNull();
  });
});
