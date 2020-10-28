// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Dependent modules
import { CourseModule } from '@vc-course/course.module';
import { AuthenticationModule } from '@vc-auth/authentication.module';
import { SharedModule } from '@vc-shared/shared.module';

// Components
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';
import { HeaderMainComponent } from './components/header-main/header-main.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    HeaderLogoComponent,
    HeaderMainComponent,
    HeaderUserComponent],
  imports: [
    CommonModule,
    RouterModule,
    CourseModule,
    SharedModule,
    AuthenticationModule
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderLogoComponent,
    HeaderMainComponent,
    HeaderUserComponent
  ]
})
export class HeaderModule { }

// Exports
export * from './components/breadcrumbs/breadcrumbs.component';
export * from './components/header-logo/header-logo.component';
export * from './components/header-main/header-main.component';
export * from './components/header-user/header-user.component';
