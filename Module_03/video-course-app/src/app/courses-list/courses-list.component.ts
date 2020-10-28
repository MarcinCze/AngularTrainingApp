import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  public courses: Course[];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
  }

  onCourseEditClick(course: Course): void {
    console.log('Course edit clicked', course);
  }

  onCourseDeleteClick(course: Course): void {
    console.log('Course delete clicked', course);
  }

  onLoadMoreClick() {
    console.log('Load More btn clicked');
  }
}
