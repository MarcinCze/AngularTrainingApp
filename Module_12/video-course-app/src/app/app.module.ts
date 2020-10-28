// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Modules
import { CoreModule } from '@vc-core/core.module';
import { CourseModule } from '@vc-course/course.module';
import { FooterModule } from '@vc-footer/footer.module';
import { HeaderModule } from '@vc-header/header.module';
import { SharedModule } from '@vc-shared/shared.module';
import { WidgetsModule } from '@vc-widgets/widgets.module';
import { AuthenticationModule } from '@vc-auth/authentication.module';

// Environment
import { environment } from '../environments/environment';

// NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@vc-auth/store/effects';
import { CourseEffects } from '@vc-course/store/effects';
import { CoreEffects } from '@vc-core/store/effects';
import { reducers } from './app.states';

// NgX Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthenticationModule,
    CourseModule,
    SharedModule,
    WidgetsModule,
    FooterModule,
    HeaderModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects, CourseEffects, CoreEffects]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'cz'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
