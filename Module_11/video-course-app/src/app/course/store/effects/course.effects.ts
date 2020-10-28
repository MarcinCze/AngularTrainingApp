import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap, map, catchError, mergeMap, concatMap, withLatestFrom, switchMap, exhaustMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseService } from '../../services/course.service';
import { CourseActions, loadSuccess, loadFailure, showLoadMoreButton, increasePageNumber, searchSuccess, loadAuthorsSuccess, getByIdSuccess, getByIdFailure, navigateToEdit, deleteSuccess } from '../actions';
import { AppState } from 'src/app/app.states';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class CourseEffects {

  load$ = createEffect(() => this.actions$.pipe(
    ofType(CourseActions.load),
    tap(() => console.log(`%c EFFECT ${CourseActions.load} `, 'background: #222; color: #bada55')),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(state => state.course.pagination)))
    )),
    mergeMap(([, paginationOptions]) => this.courseService.getList(paginationOptions.perPage, paginationOptions.currentPage)
      .pipe(
        map(response => {
          response.body.courses.forEach(course => {
            course.creationDate = new Date(course.creationDate);
          });
          return loadSuccess({ courses: response.body.courses });
        }),
        catchError(() => of(loadFailure()))
      )
    )
  ));

  loadSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CourseActions.loadSuccess),
    tap(() => console.log(`%c EFFECT ${CourseActions.loadSuccess} `, 'background: #222; color: #bada55')),
    switchMap(() => [increasePageNumber(), showLoadMoreButton()])
  ));

  search$ = createEffect(() => this.actions$.pipe(
    ofType(CourseActions.search),
    tap(() => console.log(`%c EFFECT ${CourseActions.search} `, 'background: #222; color: #bada55')),
    mergeMap((action) => this.courseService.searchItems(action['search'])
      .pipe(
        map(response => {
          response.body.forEach(course => {
            course.creationDate = new Date(course.creationDate);
          });
          return searchSuccess({ courses: response.body });
        })
      )
    )
  ));

  loadAuthors$ = createEffect(() => this.actions$.pipe(
    ofType(CourseActions.loadAuthors),
    tap(() => console.log(`%c EFFECT ${CourseActions.loadAuthors} `, 'background: #222; color: #bada55')),
    mergeMap(() => this.courseService.getAuthors()
      .pipe(map(response => loadAuthorsSuccess({ authors: response.body })))
    )
  ));

  getById$ = createEffect(() => this.actions$.pipe(
    ofType(CourseActions.getById),
    tap(() => console.log(`%c EFFECT ${CourseActions.getById} `, 'background: #222; color: #bada55')),
    mergeMap((action) => this.courseService.getItemById(action['id'])
      .pipe(
        map(response => getByIdSuccess({ course: response.body })),
        catchError(() => of(getByIdFailure()))
      )
    )
  ));

  getByIdSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CourseActions.getByIdSuccess),
    tap(() => console.log(`%c EFFECT ${CourseActions.getByIdSuccess} `, 'background: #222; color: #bada55')),
    switchMap(() => [navigateToEdit()])
  ));

  deleteConfirmed$ = createEffect(() => this.actions$.pipe(
    ofType(CourseActions.deleteConfirmed),
    tap(() => console.log(`%c EFFECT ${CourseActions.deleteConfirmed} `, 'background: #222; color: #bada55')),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(state => state.course.selectedCourse)))
    )),
    mergeMap(([, selectedCourse]) => this.courseService.removeItem(selectedCourse.id)
      .pipe(exhaustMap(() => of(deleteSuccess())))
    )
  ));

  navigateToEdit$ = createEffect(() => this.actions$.pipe(
    ofType(CourseActions.navigateToEdit),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(state => state.course.selectedCourse)))
    )),
    tap(([action, course]) => {
      console.log(`%c EFFECT ${CourseActions.navigateToEdit} `, 'background: #222; color: #bada55');
      this.router.navigate([`/courses/${course.id}`]);
    }),
  ), { dispatch: false });

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private router: Router,
    private courseService: CourseService) { }
}
