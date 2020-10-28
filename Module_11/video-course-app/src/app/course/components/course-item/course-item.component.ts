import {
  Component, OnInit, Input, Output, EventEmitter,
  OnChanges, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { VideoCourse } from '@vc-shared/shared.module';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent implements OnInit, OnChanges {
  @Input('course') course: VideoCourse;
  @Output() clickEdit = new EventEmitter<VideoCourse>();
  @Output() clickDelete = new EventEmitter<VideoCourse>();

  public isVisible: boolean;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.course != null) {
      this.isVisible = true;
    }
  }

  ngOnChanges(): void {
    if (this.course != null) {
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
