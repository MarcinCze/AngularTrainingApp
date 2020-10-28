// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Modules
import { CoreModule } from '@vc-core/core.module';
import { CourseModule } from '@vc-course/course.module';
import { FooterModule } from '@vc-footer/footer.module';
import { HeaderModule } from '@vc-header/header.module';
import { SharedModule } from '@vc-shared/shared.module';
import { WidgetsModule } from '@vc-widgets/widgets.module';
import { AuthenticationModule } from '@vc-auth/authentication.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthenticationModule,
    CourseModule,
    SharedModule,
    WidgetsModule,
    FooterModule,
    HeaderModule,
    AppRoutingModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
