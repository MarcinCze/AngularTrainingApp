import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from './components/course/courses-list/courses-list.component';
import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: '',
    component: CoursesListComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CoursesListComponent },
      { path: 'courses', component: CoursesListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
