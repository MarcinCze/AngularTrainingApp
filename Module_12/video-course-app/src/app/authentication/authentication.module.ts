// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Dependent modules
import { SharedModule } from '@vc-shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';

// NgX Translate
import { TranslateModule } from '@ngx-translate/core';

// Components
import { LoginPageComponent } from './components/login-page/login-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    SharedModule,
  ],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent]
})
export class AuthenticationModule { }

// Exports
export * from './guards/auth.guard';
export * from './services/auth.service';
export * from './components/login-page/login-page.component';
