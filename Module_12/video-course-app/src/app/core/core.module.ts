// Angular
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Dependent modules
import { CoreRoutingModule } from './core-routing.module';
import { AuthenticationModule } from '@vc-auth/authentication.module';

// Interceptors
import { httpInterceptorProviders } from './interceptors';

// Components
import { NoPageComponent } from './components/no-page/no-page.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';

// NgX Translate
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NoPageComponent,
    ServerErrorComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    AuthenticationModule,
    TranslateModule
  ],
  providers: [httpInterceptorProviders],
  exports: [NoPageComponent, ServerErrorComponent]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }

}

// Exports
export * from './services/http-client-status.service';
export * from './components/no-page/no-page.component';
export * from './components/server-error/server-error.component';
