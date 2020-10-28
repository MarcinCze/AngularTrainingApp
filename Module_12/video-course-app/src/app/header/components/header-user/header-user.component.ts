import { Component, OnInit } from '@angular/core';
import { AppUser } from '@vc-shared/shared.module';
import { Store } from '@ngrx/store';
import { AuthActions } from '@vc-auth/store/actions';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.states';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  user$: Observable<AppUser>;

  constructor(
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.user$ = this.store.select(state => state.auth.user);
  }

  onUserLinkClick(): void {

  }

  onLogoffLinkClick(): void {
    this.store.dispatch({ type: AuthActions.logout });
  }
}
