import { Action, createReducer, on } from '@ngrx/store';
import * as CoreActions from '../actions';

export interface State {
  isLoaderVisible: boolean
}

export const initialState: State = {
  isLoaderVisible: false
};

const coreReducer = createReducer(
  initialState,
  on(CoreActions.showLoader, (state) => (
    {...state, isLoaderVisible: true}
  )),
  on(CoreActions.hideLoader, (state) => (
    {...state, isLoaderVisible: false}
  ))
);

export function reducer(state: State | undefined, action: Action) {
  if (action.type.indexOf('[Core]') != -1) {
    console.log(`%c REDUCER ${action.type} `, 'background: #222; color: #bada55');
  }

  return coreReducer(state, action);
}
