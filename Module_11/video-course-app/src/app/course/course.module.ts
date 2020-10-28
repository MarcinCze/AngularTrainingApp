// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Dependent modules
import { CourseRoutingModule } from './course-routing.module';
import { AuthenticationModule } from '@vc-auth/authentication.module';
import { SharedModule } from '@vc-shared/shared.module';
import { WidgetsModule } from '@vc-widgets/widgets.module';

// Components
import { CourseItemComponent } from './components/course-item/course-item.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListToolsComponent } from './components/courses-list-tools/courses-list-tools.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';

// Directives
import { CourseDateStatusDirective } from './directives/course-date-status.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CourseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthenticationModule,
    SharedModule,
    WidgetsModule,
  ],
  declarations: [
    CourseItemComponent,
    CoursesListComponent,
    CoursesListToolsComponent,
    EditCourseComponent,
    CourseDateStatusDirective
  ],
  exports: [CoursesListComponent, EditCourseComponent]
})
export class CourseModule { }

// Exports
export * from './services/course.service';
export * from './components/courses-list/courses-list.component';
export * from './components/edit-course/edit-course.component';
