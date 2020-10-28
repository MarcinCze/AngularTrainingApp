import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions';
import { AppUser } from '../../../shared/shared.module';

export interface State {
  isAuthenticated: boolean;
  user: AppUser | null;
  token: string;
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  token: null,
  errorMessage: null
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.logout, () => {
    return initialState;
  }),
  on(AuthActions.loginSuccess, (state, { token }) => {
    return ({ ...state, token, errorMessage: null })
  }),
  on(AuthActions.loginFailure, (state, { exception }) => {
    return ({ ...state, errorMessage: exception })
  }),
  on(AuthActions.getUserSuccess, (state, { user }) => {
    return ({ ...state, user, isAuthenticated: state.token != null })
  }),
  on(AuthActions.initLoadDone, (state, { user, token }) => {
    return ({ ...state, user, token, isAuthenticated: user != null && token != null })
  }),
);

export function reducer(state: State | undefined, action: Action) {
  if (action.type.indexOf('[Auth]') != -1) {
    console.log(`%c REDUCER ${action.type} `, 'background: #222; color: #bada55');
  }

  return authReducer(state, action);
}
