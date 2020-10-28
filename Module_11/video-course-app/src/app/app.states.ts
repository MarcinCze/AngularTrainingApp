import * as auth from './authentication/store/reducers/auth.reducer';
import * as course from './course/store/reducers/course.reducer';
import * as core from './core/store/reducers/core.reducer';

export interface AppState {
  auth: auth.State;
  course: course.State;
  core: core.State;
}

export const reducers = {
  auth: auth.reducer,
  course: course.reducer,
  core: core.reducer
};
