import { createAction, props } from '@ngrx/store';
import { AppUser } from '@vc-shared/shared.module';

export enum AuthActions {
  initLoad = '[Auth] Init Load',
  initLoadDone = '[Auth] Init Load Done',
  logout = '[Auth] Logout',
  login = '[Auth] Login',
  loginSuccess = '[Auth] Login Success',
  loginFailure = '[Auth] Login Failure',
  getUser = '[Auth] GetUser',
  getUserSuccess = '[Auth] GetUser Success'
}

export const initLoad = createAction(AuthActions.initLoad);
export const initLoadDone = createAction(AuthActions.initLoadDone, props<{ user: AppUser, token: string }>());
export const login = createAction(AuthActions.login, props<{ username: string; password: string }>());
export const loginSuccess = createAction(AuthActions.loginSuccess, props<{ token: string }>());
export const loginFailure = createAction(AuthActions.loginFailure, props<{ exception: any }>());
export const getUser = createAction(AuthActions.getUser);
export const getUserSuccess = createAction(AuthActions.getUserSuccess, props<{ user: AppUser }>());
export const logout = createAction(AuthActions.logout);
