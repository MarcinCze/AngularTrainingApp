import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input('course') course: Course;
  @Output() clickEdit = new EventEmitter<Course>();
  @Output() clickDelete = new EventEmitter<Course>();

  constructor() { }

  ngOnInit(): void {
  }

  onEditClick() {
    this.clickEdit.emit(this.course);
  }

  onDeleteClick() {
    this.clickDelete.emit(this.course);
  }
}
