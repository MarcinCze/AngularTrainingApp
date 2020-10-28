import { Component, OnInit, DoCheck } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.states';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent implements OnInit, DoCheck {

  isLogged$: Observable<boolean>;

  constructor(public store: Store<AppState>) { }

  ngOnInit(): void {
    this.isLogged$ = this.store.select(state => state.auth.isAuthenticated);
  }

  ngDoCheck(): void { }

}
