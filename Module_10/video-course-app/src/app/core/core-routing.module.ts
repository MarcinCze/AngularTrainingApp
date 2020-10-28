import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { NoPageComponent } from './components/no-page/no-page.component';

const routes: Routes = [
  { path: 'error', component: ServerErrorComponent },
  { path: '**', component: NoPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
