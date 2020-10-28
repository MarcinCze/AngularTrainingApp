import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CourseSearchResultPipe } from '../../../pipes/course-search-result.pipe';
import { VideoCourse } from 'src/app/models/video-course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent implements OnInit, OnChanges {
  @Input('course') course: VideoCourse;
  // @Input('searchPattern') searchPattern: string;
  @Output() clickEdit = new EventEmitter<VideoCourse>();
  @Output() clickDelete = new EventEmitter<VideoCourse>();

  public isVisible: boolean;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.course != null) {
      this.isVisible = true;
      // this.isVisible = (new CourseSearchResultPipe()).transform(this.course.title, this.searchPattern);
    }
  }

  ngOnChanges(): void {
    if (this.course != null) {
      // this.isVisible = (new CourseSearchResultPipe()).transform(this.course.title, this.searchPattern);
    }
  }

  onEditClick() {
    this.clickEdit.emit(this.course);
  }

  onDeleteClick() {
    this.clickDelete.emit(this.course);
  }

  refresh() {
    this.cd.detectChanges();
  }
}
