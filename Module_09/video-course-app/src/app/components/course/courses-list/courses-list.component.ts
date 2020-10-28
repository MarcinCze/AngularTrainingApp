import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { OrderByPipe } from '../../../pipes/order-by.pipe';
import { Router } from '@angular/router';
import { VideoCourse } from '../../../models/video-course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  public courses: VideoCourse[];
  public searchPattern: string;
  public loadMoreVisible: boolean;
  public confModalTitle: string;
  public confModalMessage: string;
  public confIsVisible: boolean;
  private courseToDelete: VideoCourse;

  constructor(private courseService: CourseService, private router: Router, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.courses = new Array<VideoCourse>();
    this.loadMoreVisible = true;
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getList()
      .subscribe(resp => {
        console.log(resp);
        resp.body.courses.forEach(course => {
          course.creationDate = new Date(course.creationDate);
          if (this.courses.find(x => x.id === course.id) == null) {
            this.courses.push(course);
          }
        });
        this.courses = (new OrderByPipe()).transform(this.courses, 'creationDate');
        this.loadMoreVisible = true;
      },
        error => {
          this.loadMoreVisible = false;
        });
  }

  onCourseEditClick(course: VideoCourse): void {
    console.log('Course edit clicked', course);
    this.router.navigate([`/courses/${course.id}`]);
  }

  onCourseDeleteClick(course: VideoCourse): void {
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
      this.courseService.removeItem(this.courseToDelete.id)
        .subscribe(response => {
          console.log(response);
          const removeIndex = this.courses.map((item) => item.id).indexOf(this.courseToDelete.id);
          this.courses.splice(removeIndex, 1);
          this.courseToDelete = null;
        });
    }
  }

  onLoadMoreClick() {
    console.log('Load More btn clicked');
    this.courseService.increasePageNumber();
    this.loadCourses();
  }

  onFindButtonClick(searchPattern: string) {
    this.courseService.setPageNumber(1);
    this.loadMoreVisible = false;
    if (searchPattern === null || searchPattern === undefined || searchPattern === '') {
      this.loadCourses();
    } else {
      this.courses = new Array<VideoCourse>();
      this.courseService.searchItems(searchPattern)
        .subscribe(response => {
          console.log(response);
          response.body.forEach(course => {
            course.creationDate = new Date(course.creationDate);
            this.courses.push(course);
          });
          this.courses = (new OrderByPipe()).transform(this.courses, 'creationDate');
        });
    }


  }
}
