// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { AuthorPipe } from './pipes/author.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { CourseSearchResultPipe } from './pipes/course-search-result.pipe';

@NgModule({
  declarations: [
    AuthorPipe,
    CourseSearchResultPipe,
    DurationPipe,
    OrderByPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AuthorPipe,
    CourseSearchResultPipe,
    DurationPipe,
    OrderByPipe
  ]
})
export class SharedModule { }

// Exports
export * from './models/user';
export * from './models/app-user';
export * from './models/author';
export * from './models/course';
export * from './models/video-course';
export * from './pipes/author.pipe';
export * from './pipes/duration.pipe';
export * from './pipes/order-by.pipe';
export * from './pipes/course-search-result.pipe';
export * from './validators/authors.validator';
export * from './validators/custom-date.validator';
export * from './validators/is-number.validator';
