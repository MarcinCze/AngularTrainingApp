import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from './components/course/courses-list/courses-list.component';
import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';
import { EditCourseComponent } from './components/course/edit-course/edit-course.component';
import { NoPageComponent } from './components/technical-pages/no-page/no-page.component';
import { ServerErrorComponent } from './components/technical-pages/server-error/server-error.component';


const routes: Routes = [
  { path: 'courses', component: CoursesListComponent, canActivate: [AuthGuard] },
  { path: 'courses/new', component: EditCourseComponent, canActivate: [AuthGuard] },
  { path: 'courses/:id', component: EditCourseComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'error', component: ServerErrorComponent },
  { path: '', component: CoursesListComponent, canActivate: [AuthGuard] },
  { path: '**', component: NoPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
