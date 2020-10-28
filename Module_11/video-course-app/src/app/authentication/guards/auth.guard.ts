import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.states';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.store.select(state => state.auth.isAuthenticated).pipe(
      tap((logged) => {
        if (!logged) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
