import { createAction, props } from '@ngrx/store';

export enum CoreActions {
  showLoader = '[Core] Show Loader',
  hideLoader = '[Core] Hide Loader',
  setLanguage = '[Core] Set Langugage'
}

export const showLoader = createAction(CoreActions.showLoader);
export const hideLoader = createAction(CoreActions.hideLoader);
export const setLanguage = createAction(CoreActions.setLanguage, props<{ language: string }>());
