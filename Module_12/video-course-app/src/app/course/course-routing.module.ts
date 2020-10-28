import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@vc-auth/authentication.module';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';

export const routes: Routes = [
  { path: 'courses', component: CoursesListComponent, canActivate: [AuthGuard] },
  { path: 'courses/new', component: EditCourseComponent, canActivate: [AuthGuard] },
  { path: 'courses/:id', component: EditCourseComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
