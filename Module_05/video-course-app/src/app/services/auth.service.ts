import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { IUser } from '../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private lsUserKey = 'VC_User';
  private lsTokenKey = 'VC_Token';

  constructor() { }

  login(login: string, password: string): void {
    console.warn('AuthService.login: fake method');
    const user: IUser = { id: 123, firstName: 'Marcin', lastName: 'Test' };
    const token = 'abcdef123456!@#$%';
    this.cleanLocalStorage();
    localStorage.setItem(this.lsUserKey, JSON.stringify(user));
    localStorage.setItem(this.lsTokenKey, token);
  }

  logout(): void {
    console.warn('AuthService.logout: fake method');
    this.cleanLocalStorage();
  }

  isAuthenticated(): boolean {
    const user = localStorage.getItem(this.lsUserKey);
    const token = localStorage.getItem(this.lsTokenKey);
    return user != null && token != null;
  }

  getUserInfo(): User {
    const user: string = localStorage.getItem(this.lsUserKey);
    if (user != null) {
      return JSON.parse(user);
    }
    return null;
  }

  private cleanLocalStorage(): void {
    localStorage.removeItem(this.lsUserKey);
    localStorage.removeItem(this.lsTokenKey);
  }
}
