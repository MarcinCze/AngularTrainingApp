import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AppUser } from '../models/app-user';

describe('AuthService', () => {
  let service: AuthService;
  const lsUserKey = 'VC_User';
  const lsTokenKey = 'VC_Token';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in and log out', () => {
    service.login('marcin@marcin.pl', 'testTest');
    expect(localStorage.getItem(lsUserKey)).toBeTruthy();
    expect(localStorage.getItem(lsTokenKey)).toBeTruthy();
    service.logout();
    expect(localStorage.getItem(lsUserKey)).toBeFalsy();
    expect(localStorage.getItem(lsTokenKey)).toBeFalsy();
  });

  it('should show proper value of IsAuthenticated', () => {
    service.login('marcin@marcin.pl', 'testTest');
    expect(localStorage.getItem(lsUserKey)).toBeTruthy();
    expect(localStorage.getItem(lsTokenKey)).toBeTruthy();
    expect(service.isAuthenticated()).toBeTrue();
    service.logout();
    expect(localStorage.getItem(lsUserKey)).toBeFalsy();
    expect(localStorage.getItem(lsTokenKey)).toBeFalsy();
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should return user', () => {
    service.login('marcin@marcin.pl', 'testTest');
    const user: AppUser = service.getUserInfo();
    expect(user).toBeTruthy();
    expect(user.firstName).toBe('Marcin');
    expect(user.lastName).toBe('Test');
  });
});
