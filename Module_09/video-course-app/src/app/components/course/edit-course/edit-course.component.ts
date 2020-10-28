import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { VideoCourse } from '../../../models/video-course';
import { CustomDateValidator } from '../../../validators/custom-date.validator';
import { IsNumberValidator } from '../../../validators/is-number.validator';
import { DatePipe } from '@angular/common';
import { Author } from '../../../models/author';
import { AuthorsValidator } from '../../../validators/authors.validator';


@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit, AfterViewInit {

  public pageTitle: string;
  public courseId: number;
  public course: VideoCourse;
  public allAuthors: Author[];

  public courseForm = new FormGroup({
    title: new FormControl(
      this.course?.title,
      [Validators.required, Validators.maxLength(50)]),
    description: new FormControl(
      this.course?.description,
      [Validators.required, Validators.maxLength(500)]),
    creationDate: new FormControl(
      this.course?.creationDate,
      [Validators.required, CustomDateValidator.validate]),
    duration: new FormControl(
      this.course?.duration,
      [Validators.required, IsNumberValidator.validate]),
    authors: new FormControl(
      this.course?.authors,
      [/* Validators.required, */ AuthorsValidator.atLeastOne, AuthorsValidator.maxFive]
    )
  });

  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService) { }

  get title() { return this.courseForm.get('title'); }
  get description() { return this.courseForm.get('description'); }
  get creationDate() { return this.courseForm.get('creationDate'); }
  get duration() { return this.courseForm.get('duration'); }
  get authors() { return this.courseForm.get('authors'); }

  ngOnInit(): void {
    this.courseService.getAuthors().subscribe(resp => {
      this.allAuthors = resp.body;
    });

    if (this.route.snapshot.paramMap.get('id') == null) {
      this.prepareAsNewCourse();
      return;
    }

    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    this.courseService.getItemById(this.courseId).subscribe(
      resp => {
        console.log(resp);
        this.course = resp.body;

        if (this.course == null) {
          this.prepareAsNewCourse();
        } else {
          this.prepareAsEditCourse();
        }
      },
      error => {
        this.prepareAsNewCourse();
      });
  }

  ngAfterViewInit(): void {

  }

  onCancelClick(): void {
    this.navigateToList();
  }

  onSubmit(): void {
    if (this.courseId === -1) {
      const newCourse = new VideoCourse();
      newCourse.title = this.courseForm.value.title;
      newCourse.description = this.courseForm.value.description;
      newCourse.creationDate = this.textToDate(this.courseForm.value.creationDate);
      newCourse.duration = +this.courseForm.value.duration;
      newCourse.authors = this.courseForm.value.authors;
      console.log(newCourse);

      this.courseService.createItem(newCourse)
        .subscribe(response => {
          console.log(response);
          this.navigateToList();
          return;
        });
    } else {
      this.course.title = this.courseForm.value.title;
      this.course.description = this.courseForm.value.description;
      this.course.duration = +this.courseForm.value.duration;
      this.course.creationDate = this.textToDate(this.courseForm.value.creationDate);
      this.course.authors = this.courseForm.value.authors;

      this.courseService.updateItem(this.course)
      .subscribe(response => {
        console.log(response);
        this.navigateToList();
        return;
      });
    }
  }

  private prepareAsNewCourse(): void {
    this.pageTitle = 'Add new course';
    this.courseId = -1;
  }

  private prepareAsEditCourse(): void {
    this.pageTitle = 'Edit course';

    const clonedArray = [];
    this.course.authors.forEach(val => clonedArray.push(Object.assign({}, val)));

    this.courseForm.patchValue({
      title: this.course.title,
      description: this.course.description,
      creationDate: new DatePipe('en-US').transform(this.course.creationDate, 'dd/MM/yyyy'),
      duration: this.course.duration,
      authors: clonedArray
    });
  }

  private navigateToList(): void {
    this.courseService.setPageNumber(1);
    this.router.navigate(['/courses']);
  }

  private textToDate(text: string): Date {
    // Input example 25/12/2017
    return new Date(`${text?.substr(6, 4)}-${text?.substr(3, 2)}-${text?.substr(0, 2)}`);
  }

}
