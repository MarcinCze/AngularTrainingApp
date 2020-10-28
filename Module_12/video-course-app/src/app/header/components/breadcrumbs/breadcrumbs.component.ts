import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CourseService } from '@vc-course/course.module';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.states';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  public courseName$: Observable<string>;

  constructor(private store: Store<AppState>, private router: Router, private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseName$ = this.store.select(state => state.course.selectedCourse?.title);
  }

  private isEditPage(url: string): boolean {
    const regex = new RegExp('\/courses\/[0-9]+');
    return regex.test(url);
  }

  private extractIdFromUrl(url: string): number {
    return +url.substr(url.lastIndexOf('/') + 1);
  }
}
