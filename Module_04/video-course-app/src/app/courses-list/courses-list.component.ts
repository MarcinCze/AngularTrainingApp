import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';
import { OrderByPipe } from '../pipes/order-by.pipe';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  public courses: Course[];
  public searchPattern: string;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCoursesFromJson()
      ?.subscribe(resp => {
        this.courses = (new OrderByPipe()).transform(resp, 'creationDate');
      });
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

  onFindButtonClick(searchPattern: string) {
    this.searchPattern = searchPattern;
  }
}
