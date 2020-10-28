import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { HttpClientStatusService } from './http-client-status.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private lsUserKey = 'VC_User';
  private lsTokenKey = 'VC_Token';
  private srvUrl = 'https://api-video-course.azurewebsites.net/api/auth';

  constructor(private http: HttpClient, private clientStatus: HttpClientStatusService) { }

  login(login: string, password: string): Observable<HttpResponse<string>> {
    this.cleanLocalStorage();
    return this.http.post<string>(this.srvUrl, { login, password }, { observe: 'response' })
      .pipe(
        tap(response => {
          localStorage.setItem(this.lsTokenKey, response.body);
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.cleanLocalStorage();
  }

  isAuthenticated(): boolean {
    const user = localStorage.getItem(this.lsUserKey);
    const token = localStorage.getItem(this.lsTokenKey);
    return user != null && token != null;
  }

  getUserInfo(): AppUser {
    const user: string = localStorage.getItem(this.lsUserKey);
    if (user != null) {
      return JSON.parse(user);
    }
    return null;
  }

  getToken(): string {
    return localStorage.getItem(this.lsTokenKey);
  }

  getUserInfoFromSrv(): Observable<HttpResponse<AppUser>> {
    return this.http.get<AppUser>(this.srvUrl, { observe: 'response' })
      .pipe(
        tap(response => {
          console.log(response);
          localStorage.setItem(this.lsUserKey, JSON.stringify(response.body));
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      return throwError('Invalid credentials. Please verify login & password');
    } else {
      return throwError('A data error occured. Please try again later.');
    }
  }

  private cleanLocalStorage(): void {
    localStorage.removeItem(this.lsUserKey);
    localStorage.removeItem(this.lsTokenKey);
  }
}
