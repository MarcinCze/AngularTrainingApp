import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderMainComponent } from './components/header/header-main/header-main.component';
import { HeaderLogoComponent } from './components/header/header-logo/header-logo.component';
import { BreadcrumbsComponent } from './components/header/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoursesListComponent } from './components/course/courses-list/courses-list.component';
import { CourseItemComponent } from './components/course/course-item/course-item.component';
import { CoursesListToolsComponent } from './components/course/courses-list-tools/courses-list-tools.component';
import { HeaderUserComponent } from './components/header/header-user/header-user.component';
import { DurationPipe } from './pipes/duration.pipe';
import { CourseSearchResultPipe } from './pipes/course-search-result.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { CourseDateStatusDirective } from './directives/course-date-status.directive';
import { ConfirmationModalComponent } from './components/widgets/confirmation-modal/confirmation-modal.component';
import { LoginPageComponent } from './components/login/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMainComponent,
    HeaderLogoComponent,
    BreadcrumbsComponent,
    FooterComponent,
    CoursesListComponent,
    CourseItemComponent,
    CoursesListToolsComponent,
    HeaderUserComponent,
    DurationPipe,
    CourseSearchResultPipe,
    OrderByPipe,
    CourseDateStatusDirective,
    ConfirmationModalComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
