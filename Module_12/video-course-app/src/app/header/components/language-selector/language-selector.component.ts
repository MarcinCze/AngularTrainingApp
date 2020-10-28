import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.states';
import { Store } from '@ngrx/store';
import { setLanguage } from '@vc-core/store/actions';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

  }

  selectChanged(event) {
    this.store.dispatch(setLanguage({ language: event.target.value }));
  }

}
