import { Injectable } from '@angular/core';
import { AppUser } from '@vc-shared/shared.module';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userInfo: Observable<AppUser> = new Observable<AppUser>(observer => {
    observer.next(this.getUserInfo());
    observer.complete();
  });

  public isLogged: Observable<boolean> = new Observable<boolean>(observer => {
    observer.next(this.isAuthenticated());
    observer.complete();
  });

  public accessData: Observable<{ user: AppUser, token: string }> = new Observable<{ user: AppUser, token: string }>(observer => {
    observer.next({
      user: this.getUserInfo(),
      token: this.getToken()
    });
    observer.complete();
  });

  private lsUserKey = 'VC_User';
  private lsTokenKey = 'VC_Token';
  private srvUrl = 'https://api-video-course.azurewebsites.net/api/auth';

  constructor(private http: HttpClient) { }

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

  private getToken(): string {
    return localStorage.getItem(this.lsTokenKey);
  }

  private isAuthenticated(): boolean {
    return localStorage.getItem(this.lsTokenKey) != null && localStorage.getItem(this.lsUserKey) != null;
  }

  private getUserInfo(): AppUser {
    const user: string = localStorage.getItem(this.lsUserKey);
    if (user != null) {
      return JSON.parse(user);
    }
    return null;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      return throwError('Invalid credentials. Please verify login & password');
    } else {
      return throwError('A data error occured. Please try again later.');
    }
  }

  private cleanLocalStorage(): void {
    // console.log('%c REMOVING USER ', 'background: #222; color: #bada55');
    localStorage.removeItem(this.lsUserKey);
    // console.log('%c REMOVING TOKEN ', 'background: #222; color: #bada55');
    localStorage.removeItem(this.lsTokenKey);
  }
}
