import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeaderLogoComponent } from './header-logo/header-logo.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './course/course.component';
import { CoursesListToolsComponent } from './courses-list-tools/courses-list-tools.component';
import { HeaderUserComponent } from './header-user/header-user.component';
import { DurationPipe } from './pipes/duration.pipe';
import { CourseSearchResultPipe } from './pipes/course-search-result.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { CourseDateStatusDirective } from './directives/course-date-status.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderLogoComponent,
    BreadcrumbsComponent,
    FooterComponent,
    CoursesListComponent,
    CourseComponent,
    CoursesListToolsComponent,
    HeaderUserComponent,
    DurationPipe,
    CourseSearchResultPipe,
    OrderByPipe,
    CourseDateStatusDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
