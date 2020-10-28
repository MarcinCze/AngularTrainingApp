import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AppState } from 'src/app/app.states';
import { VideoCourse } from '@vc-shared/shared.module';
import {
  load,
  setMessageBoxOptions,
  setPickedCourse,
  deleteRejected,
  deleteConfirmed,
  setPageToFirstOne,
  hideLoadMoreButton,
  search,
  cleanCoursesList,
  loadAuthors,
  getById
} from '@vc-course/store/actions';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  public courses$: Observable<VideoCourse[]>;
  public loadMoreVisible$: Observable<boolean>;
  public messageBoxOptions$: Observable<{ title: string, message: string, isVisible: boolean }>;

  constructor(private store: Store<AppState>, private translator: TranslateService) { }

  ngOnInit(): void {
    this.courses$ = this.store.select(state => state.course.courses);
    this.loadMoreVisible$ = this.store.select(state => state.course.isLoadMoreVisible);
    this.messageBoxOptions$ = this.store.select(state => state.course.messageBoxOptions);
    this.store.dispatch(loadAuthors());
    this.store.dispatch(setPickedCourse({ pickedCourse: null }));
    this.loadCourses();
    this.setSearchMechanism();
  }

  setSearchMechanism(): void {
    fromEvent(document.getElementById('searchText'), 'keyup')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        filter(text => text.length >= 3 || text.length === 0),
        debounceTime(100),
        distinctUntilChanged(),
      )
      .subscribe(val => {

        this.store.dispatch(setPageToFirstOne());
        this.store.dispatch(cleanCoursesList());

        if (val.length === 0) {
          this.store.dispatch(load());
        } else {
          this.store.dispatch(search({ search: val }));
          this.store.dispatch(hideLoadMoreButton());
        }

      });
  }

  loadCourses(): void {
    this.store.dispatch(load());
  }

  onCourseEditClick(course: VideoCourse): void {
    console.log('Course edit clicked', course);
    this.store.dispatch(getById({ id: course.id }));
  }

  onCourseDeleteClick(course: VideoCourse): void {
    console.log('Course delete clicked', course);
    this.store.dispatch(setPickedCourse({ pickedCourse: course }));
    this.translator.get(['COURSE.LIST.MSG_DELETE', 'COURSE.LIST.MSG_TITLE'], { courseTitle: course.title }).subscribe((translation) => {
      this.store.dispatch(setMessageBoxOptions({
        title: translation['COURSE.LIST.MSG_TITLE'],
        message: translation['COURSE.LIST.MSG_DELETE'],
        isVisible: true
      }));
    });
  }

  onDeleteConfirmationReceived(confirmed: boolean): void {
    if (confirmed) {
      this.store.dispatch(deleteConfirmed());
    } else {
      this.store.dispatch(deleteRejected());
    }
  }

  onLoadMoreClick() {
    console.log('Load More btn clicked');
    this.loadCourses();
  }
}
