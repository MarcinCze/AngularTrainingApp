import { Component, OnInit } from '@angular/core';
import { VideoCourse, OrderByPipe } from '@vc-shared/shared.module';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  public courses: VideoCourse[];
  public loadMoreVisible: boolean;
  public confModalTitle: string;
  public confModalMessage: string;
  public confIsVisible: boolean;
  private courseToDelete: VideoCourse;
  private searchResults: Observable<VideoCourse[]>;

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.courses = new Array<VideoCourse>();
    this.loadMoreVisible = true;
    this.loadCourses();
    this.setSearchObservable();
  }

  setSearchObservable(): void {
    this.searchResults = fromEvent(document.getElementById('searchText'), 'keyup').pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length >= 3 || text.length === 0),
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((val) => {
        this.courseService.setPageNumber(1);
        this.courses = new Array<VideoCourse>();
        if (val.length === 0) {
          this.loadMoreVisible = true;
          return this.courseService.getExactList();
        } else {
          this.loadMoreVisible = false;
          return this.courseService.searchExactItems(val);
        }
      })
    );

    this.searchResults.subscribe(val => {
      val.forEach(course => {
        course.creationDate = new Date(course.creationDate);
        if (this.courses.find(x => x.id === course.id) == null) {
          this.courses.push(course);
        }
      });
      this.courses = (new OrderByPipe()).transform(this.courses, 'creationDate');
    });
  }

  loadCourses(): void {
    this.courseService.getList()
      .subscribe(resp => {
        resp.body.courses.forEach(course => {
          course.creationDate = new Date(course.creationDate);
          if (this.courses.find(x => x.id === course.id) == null) {
            this.courses.push(course);
          }
        });
        this.courses = (new OrderByPipe()).transform(this.courses, 'creationDate');
        this.loadMoreVisible = true;
      },
        () => {
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
}
