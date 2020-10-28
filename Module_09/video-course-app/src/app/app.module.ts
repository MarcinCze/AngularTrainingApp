// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HeaderMainComponent } from './components/header/header-main/header-main.component';
import { HeaderLogoComponent } from './components/header/header-logo/header-logo.component';
import { BreadcrumbsComponent } from './components/header/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoursesListComponent } from './components/course/courses-list/courses-list.component';
import { CourseItemComponent } from './components/course/course-item/course-item.component';
import { CoursesListToolsComponent } from './components/course/courses-list-tools/courses-list-tools.component';
import { HeaderUserComponent } from './components/header/header-user/header-user.component';
import { ConfirmationModalComponent } from './components/widgets/confirmation-modal/confirmation-modal.component';
import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { EditCourseComponent } from './components/course/edit-course/edit-course.component';
import { DateControlComponent } from './components/widgets/date-control/date-control.component';
import { DurationControlComponent } from './components/widgets/duration-control/duration-control.component';
import { AuthorsControlComponent } from './components/widgets/authors-control/authors-control.component';
import { NoPageComponent } from './components/technical-pages/no-page/no-page.component';
import { LoaderComponent } from './components/widgets/loader/loader.component';
import { ServerErrorComponent } from './components/technical-pages/server-error/server-error.component';

// Pipes
import { OrderByPipe } from './pipes/order-by.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { AuthorPipe } from './pipes/author.pipe';
import { CourseSearchResultPipe } from './pipes/course-search-result.pipe';

// Directives
import { CourseDateStatusDirective } from './directives/course-date-status.directive';

// Interceptors
import { httpInterceptorProviders } from './interceptors/index';

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
    EditCourseComponent,
    DateControlComponent,
    DurationControlComponent,
    AuthorsControlComponent,
    NoPageComponent,
    AuthorPipe,
    LoaderComponent,
    ServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
