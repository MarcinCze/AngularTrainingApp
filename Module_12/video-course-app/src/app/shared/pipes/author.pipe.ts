import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../models/author';

@Pipe({
  name: 'author'
})
export class AuthorPipe implements PipeTransform {

  transform(author: Author): string {
    return `${author.firstName} ${author.lastName}`;
  }

}
