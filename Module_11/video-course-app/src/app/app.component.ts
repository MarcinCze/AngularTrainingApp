import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClientStatusService } from '@vc-core/core.module';
import { Store } from '@ngrx/store';
import { AppState } from './app.states';
import { initLoad } from '@vc-auth/store/actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'video-course-app';
  isLoaderVisible$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private changeDetector: ChangeDetectorRef,
    private titleService: Title,
    public clientService: HttpClientStatusService) { }

  ngOnInit(): void {
    this.store.dispatch(initLoad());
    this.isLoaderVisible$ = this.store.select(state => state.core.isLoaderVisible);

    const pckg = require('./../../package.json');
    this.titleService.setTitle(`VideoCourse ${pckg.version} - ${pckg.description}`);
  }

}
