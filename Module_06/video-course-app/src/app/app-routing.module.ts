import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from './components/course/courses-list/courses-list.component';
import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';
import { EditCourseComponent } from './components/course/edit-course/edit-course.component';
import { Course } from './models/course';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', component: CoursesListComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CoursesListComponent, canActivate: [AuthGuard] },
  { path: 'course/add', component: EditCourseComponent, canActivate: [AuthGuard] },
  { path: 'course/edit/:id', component: EditCourseComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
