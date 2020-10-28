// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// NgX Translate
import { TranslateModule } from '@ngx-translate/core';

// Components
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }

// Exports
export * from './components/footer/footer.component';
