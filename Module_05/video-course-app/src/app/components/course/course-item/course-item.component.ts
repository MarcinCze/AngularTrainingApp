import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Course } from '../../../models/course';
import { CourseSearchResultPipe } from '../../../pipes/course-search-result.pipe';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit, OnChanges {
  @Input('course') course: Course;
  @Input('searchPattern') searchPattern: string;
  @Output() clickEdit = new EventEmitter<Course>();
  @Output() clickDelete = new EventEmitter<Course>();

  public isVisible: boolean;

  constructor() { }

  ngOnInit(): void {
    if (this.course != null) {
      this.isVisible = (new CourseSearchResultPipe()).transform(this.course.title, this.searchPattern);
    }
  }

  ngOnChanges(): void {
    if (this.course != null) {
      this.isVisible = (new CourseSearchResultPipe()).transform(this.course.title, this.searchPattern);
    }
  }

  onEditClick() {
    this.clickEdit.emit(this.course);
  }

  onDeleteClick() {
    this.clickDelete.emit(this.course);
  }
}
