import { Course } from './course';

export class VideoCourse implements Course {
  id: number;
  title: string;
  creationDate: Date;
  duration: number;
  description: string;
  topRated: boolean;
}
