import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseSearchResult'
})
export class CourseSearchResultPipe implements PipeTransform {

  transform(courseName: string, searchPattern: string): boolean {
    return (searchPattern === null || searchPattern === undefined || searchPattern === '')
      ? true
      : courseName.toLowerCase().includes(searchPattern.toLowerCase());
  }

}
