import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { DateControlComponent } from '../../widgets/date-control/date-control.component';
import { DurationControlComponent } from '../../widgets/duration-control/duration-control.component';
import { AuthorsControlComponent } from '../../widgets/authors-control/authors-control.component';
import { VideoCourse } from '../../../models/video-course';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit, AfterViewInit {

  @ViewChild(DateControlComponent)
  public dateControl: DateControlComponent;

  @ViewChild(DurationControlComponent)
  public durationControl: DurationControlComponent;

  @ViewChild(AuthorsControlComponent)
  public authorsControl: AuthorsControlComponent;

  public title: string;
  public courseId: number;
  public course: VideoCourse;
  public courseForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit(): void {

    if (this.route.snapshot.paramMap.get('id') == null) {
      this.prepareAsNewCourse();
      return;
    }

    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.course = this.courseService.getItemById(this.courseId);

    if (this.course == null) {
      this.prepareAsNewCourse();
    } else {
      this.prepareAsEditCourse();
    }
  }

  ngAfterViewInit(): void {
    if (this.course != null) {
      this.dateControl?.setValue(this.course.creationDate);
      this.durationControl?.setValue(this.course.duration);
    }
  }

  onCancelClick(): void {
    this.navigateToList();
  }

  onSubmit(): void {
    if (this.courseId === -1) {
      const newCourse = new VideoCourse();
      newCourse.title = this.courseForm.value.title;
      newCourse.description = this.courseForm.value.description;
      newCourse.creationDate = this.dateControl?.getValue();
      newCourse.duration = this.durationControl?.getValue();
      this.courseService.createCourse(newCourse);
      this.navigateToList();
      return;
    }

    this.courseService.updateItem(
      this.course.id,
      this.courseForm.value.title,
      this.durationControl?.getValue(),
      this.courseForm.value.description,
      this.dateControl?.getValue(),
      undefined);
    this.navigateToList();
  }

  private prepareAsNewCourse(): void {
    this.title = 'Add new course';
    this.courseId = -1;
  }

  private prepareAsEditCourse(): void {
    this.title = 'Edit course';
    this.courseForm.patchValue({
      title: this.course.title,
      description: this.course.description
    });
  }

  private navigateToList(): void {
    this.router.navigate(['/courses']);
  }

}
