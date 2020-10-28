import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  VideoCourse, Author,
  CustomDateValidator, IsNumberValidator, AuthorsValidator
} from '@vc-shared/shared.module';
import { CourseService } from '../../services/course.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.states';
import { setPageToFirstOne, cleanCoursesList } from '@vc-course/store/actions';
import { Observable } from 'rxjs';

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
  private courseData$: Observable<any>;

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

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private courseService: CourseService,
    private translator: TranslateService
  ) { }

  get title() { return this.courseForm.get('title'); }
  get description() { return this.courseForm.get('description'); }
  get creationDate() { return this.courseForm.get('creationDate'); }
  get duration() { return this.courseForm.get('duration'); }
  get authors() { return this.courseForm.get('authors'); }

  ngOnInit(): void {
    this.courseData$ = this.store.select(state => state.course);
    this.courseData$.subscribe(data => {
      this.allAuthors = data.authors;
      if (data.selectedCourse != null) {
        this.course = Object.assign({}, data.selectedCourse);
        this.prepareAsEditCourse();
      } else {
        this.prepareAsNewCourse();
      }
    }).unsubscribe();
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
      console.log('New course: ', newCourse);

      this.courseService.createItem(newCourse)
        ?.subscribe(response => {
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
        ?.subscribe(response => {
          console.log(response);
          this.navigateToList();
          return;
        });
    }
  }

  private prepareAsNewCourse(): void {
    this.translator.get('COURSE.EDITOR.PAGE_TITLE_ADD').subscribe((title: string) => {
      this.pageTitle = title;
    });
    this.courseId = -1;
  }

  private prepareAsEditCourse(): void {
    this.translator.get('COURSE.EDITOR.PAGE_TITLE_EDIT').subscribe((title: string) => {
      this.pageTitle = title;
    });

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
    this.store.dispatch(setPageToFirstOne());
    this.store.dispatch(cleanCoursesList());
    this.router.navigate(['/courses']);
  }

  private textToDate(text: string): Date {
    // Input example 25/12/2017
    return new Date(`${text?.substr(6, 4)}-${text?.substr(3, 2)}-${text?.substr(0, 2)}`);
  }

}
