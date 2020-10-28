import { Component, OnInit } from '@angular/core';
import { Course } from '../../../models/course';
import { CourseService } from '../../../services/course.service';
import { OrderByPipe } from '../../../pipes/order-by.pipe';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  public courses: Course[];
  public searchPattern: string;
  public confModalTitle: string;
  public confModalMessage: string;
  public confIsVisible: boolean;
  private courseToDelete: Course;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courses = (new OrderByPipe()).transform(this.courseService.getList(), 'creationDate');
  }

  onCourseEditClick(course: Course): void {
    console.log('Course edit clicked', course);
  }

  onCourseDeleteClick(course: Course): void {
    console.log('Course delete clicked', course);
    this.courseToDelete = course;
    this.confModalTitle = 'Confirmation';
    this.confModalMessage = `Are you sure to remove course ${course.title}?`;
    this.confIsVisible = true;
  }

  onDeleteConfirmationReceived(confirmed: boolean): void {
    this.confIsVisible = false;
    this.confModalTitle = this.confModalMessage = null;

    if (confirmed) {
      this.courseService.removeItem(this.courseToDelete.id);
      this.courseToDelete = null;
      this.loadCourses();
    }
  }

  onLoadMoreClick() {
    console.log('Load More btn clicked');
  }

  onFindButtonClick(searchPattern: string) {
    this.searchPattern = searchPattern;
  }
}
