import { Injectable } from '@angular/core';
import { VideoCourse } from '../models/video-course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses: VideoCourse[];

  constructor() {
    if (this.courses == null) {
      this.readFromFile();
    }
  }

  getList(): VideoCourse[] {
    return this.courses;
  }

  getItemById(id: number): VideoCourse {
    return this.courses.find(course => course.id === id);
  }

  createCourse(course: VideoCourse): void {
    let max = 1;
    this.courses.forEach(c => {
      if (c.id > max) {
        max = c.id;
      }
    });
    course.id = ++max;
    this.courses.push(course);
    console.log('New courses list', this.courses);
  }

  updateItem(
    id: number,
    title?: string,
    duration?: number,
    description?: string,
    creationDate?: Date,
    topRated?: boolean): void {

    const course = this.getItemById(id);

    if (course == null) {
      console.error('CourseService.updateItem - course not found');
      return;
    }

    course.title = title ?? course.title;
    course.duration = duration ?? course.duration;
    course.description = description ?? course.description;
    course.topRated = topRated ?? course.topRated;
    course.creationDate = creationDate ?? course.creationDate;
  }

  removeItem(id: number): void {
    const removeIndex = this.courses.map((item) => item.id).indexOf(id);
    this.courses.splice(removeIndex, 1);
  }

  private readFromFile(): void {
    const mockCourses = require('./../../assets/courses.json');
    console.log('Mock courses', mockCourses);
    this.courses = new Array<VideoCourse>();
    mockCourses.forEach(element => {
      element.creationDate = new Date(element.creationDate);
      this.courses.push(element);
    });
  }
}
