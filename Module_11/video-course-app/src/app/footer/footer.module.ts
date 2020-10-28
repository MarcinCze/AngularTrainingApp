// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }

// Exports
export * from './components/footer/footer.component';
