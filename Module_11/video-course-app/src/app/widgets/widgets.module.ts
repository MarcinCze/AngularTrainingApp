// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Dependent modules
import { SharedModule } from '@vc-shared/shared.module';
import { WidgetsRoutingModule } from './widgets-routing.module';

// Components
import { AuthorsControlComponent } from './components/authors-control/authors-control.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { DateControlComponent } from './components/date-control/date-control.component';
import { DurationControlComponent } from './components/duration-control/duration-control.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    WidgetsRoutingModule,
    SharedModule,
  ],
  declarations: [
    AuthorsControlComponent,
    ConfirmationModalComponent,
    DateControlComponent,
    DurationControlComponent,
    LoaderComponent
  ],
  exports: [
    AuthorsControlComponent,
    ConfirmationModalComponent,
    DateControlComponent,
    DurationControlComponent,
    LoaderComponent
  ]
})
export class WidgetsModule { }

// Exports
export * from './components/authors-control/authors-control.component';
export * from './components/confirmation-modal/confirmation-modal.component';
export * from './components/date-control/date-control.component';
export * from './components/duration-control/duration-control.component';
export * from './components/loader/loader.component';
