import { Course } from './course';
import { Author } from './author';

export class VideoCourse implements Course {
  id: number;
  title: string;
  creationDate: Date;
  duration: number;
  description: string;
  topRated: boolean;
  authors: Author[];
}
