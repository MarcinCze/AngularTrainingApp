import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(courses: Course[], fieldName: string): Course[] {
    return courses == null
      ? courses
      : courses.sort((a, b) => (a[fieldName] > b[fieldName])
        ? 1
        : ((b[fieldName] > a[fieldName])
          ? -1
          : 0));
  }

}
