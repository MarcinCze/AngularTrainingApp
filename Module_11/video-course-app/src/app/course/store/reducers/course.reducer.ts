import { Action, createReducer, on } from '@ngrx/store';
import { VideoCourse, Author } from '@vc-shared/shared.module';
import * as CourseActions from '../actions';

export interface State {
  courses: VideoCourse[];
  selectedCourse: VideoCourse;
  authors: Author[];
  searchWord: string;
  messageBoxOptions: { title: string, message: string, isVisible: boolean };
  pagination: { perPage: number, currentPage: 1 };
  isLoadMoreVisible: boolean;
}

export const initialState: State = {
  courses: new Array<VideoCourse>(),
  selectedCourse: null,
  authors: new Array<Author>(),
  searchWord: null,
  messageBoxOptions: { title: null, message: null, isVisible: false },
  pagination: { perPage: 4, currentPage: 1 },
  isLoadMoreVisible: false,

};

const courseReducer = createReducer(
  initialState,
  on(CourseActions.setPageToFirstOne, (state) => (
    { ...state, pagination: { perPage: 4, currentPage: 1 } }
  )),
  on(CourseActions.increasePageNumber, (state) => (
    { ...state, pagination: { perPage: 4, currentPage: state.pagination.currentPage + 1 } }
  )),
  on(CourseActions.setMessageBoxOptions, (state, { title, message, isVisible }) => (
    { ...state, messageBoxOptions: { title, message, isVisible } }
  )),
  on(CourseActions.showLoadMoreButton, (state) => (
    { ...state, isLoadMoreVisible: true }
  )),
  on(CourseActions.hideLoadMoreButton, (state) => (
    { ...state, isLoadMoreVisible: false }
  )),
  on(CourseActions.loadSuccess, (state, { courses }) => (
    { ...state, courses: [...state.courses, ...courses] }
  )),
  on(CourseActions.loadFailure, (state) => (
    { ...state, isLoadMoreVisible: false }
  )),
  on(CourseActions.setPickedCourse, (state, { pickedCourse }) => (
    { ...state, selectedCourse: pickedCourse }
  )),
  on(CourseActions.deleteRejected, (state) => (
    { ...state, messageBoxOptions: { title: null, message: null, isVisible: false }, selectedCourse: null }
  )),
  on(CourseActions.cleanCoursesList, (state) => (
    { ...state, courses: new Array<VideoCourse>() }
  )),
  on(CourseActions.searchSuccess, (state, { courses }) => (
    { ...state, courses: courses }
  )),
  on(CourseActions.loadAuthorsSuccess, (state, { authors }) => (
    { ...state, authors: authors }
  )),
  on(CourseActions.getByIdSuccess, (state, { course }) => (
    { ...state, selectedCourse: course }
  )),
  on(CourseActions.getByIdFailure, (state) => (
    { ...state, selectedCourse: null }
  )),
  on(CourseActions.deleteSuccess, (state) => {
    const index = state.courses.findIndex(x => x.id === state.selectedCourse.id);
    return {
      ...state,
      courses: [...state.courses.slice(0, index), ...state.courses.slice(index + 1)],
      selectedCourse: null,
      messageBoxOptions: { title: null, message: null, isVisible: false }
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  if (action.type.indexOf('[Course]') !== -1) {
    console.log(`%c REDUCER ${action.type} `, 'background: #222; color: #bada55');
  }

  return courseReducer(state, action);
}
