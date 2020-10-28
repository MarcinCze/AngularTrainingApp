import { createAction, props } from '@ngrx/store';

export enum CoreActions {
  showLoader = '[Core] Show Loader',
  hideLoader = '[Core] Hide Loader',
}

export const showLoader = createAction(CoreActions.showLoader);
export const hideLoader = createAction(CoreActions.hideLoader);
