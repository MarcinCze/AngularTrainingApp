import { createAction, props } from '@ngrx/store';
import { VideoCourse, Author } from '@vc-shared/shared.module';

export enum CourseActions {
  load = '[Course] Load',
  loadSuccess = '[Course] Load Success',
  loadFailure = '[Course] Load Failure',
  setPageToFirstOne = '[Course] Set Page to first one',
  increasePageNumber = '[Course] Increase page number',
  setMessageBoxOptions = '[Course] Set message box options',
  showLoadMoreButton = '[Course] Show LoadMore button',
  hideLoadMoreButton = '[Course] Hide LoadMore button',
  setPickedCourse = '[Course] Set picked course',
  deleteConfirmed = '[Course] Delete Confirmed',
  deleteRejected = '[Course] Delete Rejected',
  deleteSuccess = '[Course] Delete Success',
  search = '[Course] Search',
  searchSuccess = '[Course] Search Success',
  cleanCoursesList = '[Course] Clean list',
  loadAuthors = '[Course] Load Authors',
  loadAuthorsSuccess = '[Course] Load Authors Success',
  getById = '[Course] Get by ID',
  getByIdSuccess = '[Course] Get by ID Success',
  getByIdFailure = '[Course] Get by ID Failure',
  navigateToEdit = '[Course] Navigate to EDIT page'
}

export const load = createAction(CourseActions.load);
export const loadSuccess = createAction(CourseActions.loadSuccess, props<{ courses: VideoCourse[] }>());
export const loadFailure = createAction(CourseActions.loadFailure);
export const setPageToFirstOne = createAction(CourseActions.setPageToFirstOne);
export const increasePageNumber = createAction(CourseActions.increasePageNumber);
export const showLoadMoreButton = createAction(CourseActions.showLoadMoreButton);
export const hideLoadMoreButton = createAction(CourseActions.hideLoadMoreButton);
export const search = createAction(CourseActions.search, props<{ search: string }>());
export const searchSuccess = createAction(CourseActions.searchSuccess, props<{ courses: VideoCourse[] }>());
export const deleteConfirmed = createAction(CourseActions.deleteConfirmed);
export const deleteRejected = createAction(CourseActions.deleteRejected);
export const deleteSuccess = createAction(CourseActions.deleteSuccess);
export const setMessageBoxOptions = createAction(CourseActions.setMessageBoxOptions, props<{ title: string, message: string, isVisible: boolean }>())
export const setPickedCourse = createAction(CourseActions.setPickedCourse, props<{ pickedCourse: VideoCourse }>());
export const cleanCoursesList = createAction(CourseActions.cleanCoursesList);
export const loadAuthors = createAction(CourseActions.loadAuthors);
export const loadAuthorsSuccess = createAction(CourseActions.loadAuthorsSuccess, props<{ authors: Author[] }>());
export const getById = createAction(CourseActions.getById, props<{ id: number }>());
export const getByIdSuccess = createAction(CourseActions.getByIdSuccess, props<{ course: VideoCourse }>());
export const getByIdFailure = createAction(CourseActions.getByIdFailure);
export const navigateToEdit = createAction(CourseActions.navigateToEdit);
