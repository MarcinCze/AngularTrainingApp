import { Injectable } from '@angular/core';
import { tap, exhaustMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoreActions } from '../actions';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CoreEffects {

  setLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.setLanguage),
    tap(() => console.log(`%c EFFECT ${CoreActions.setLanguage} `, 'background: #222; color: #bada55')),
    exhaustMap(action => this.translator.use(action['language'])
    )), { dispatch: false });

  constructor(
    private actions$: Actions,
    private translator: TranslateService) { }
}
