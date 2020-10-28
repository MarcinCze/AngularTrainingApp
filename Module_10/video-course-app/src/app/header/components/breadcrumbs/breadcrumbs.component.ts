import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CourseService } from '@vc-course/course.module';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  public courseName: string;

  constructor(private router: Router, private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseName = null;

    this.router.events
      ?.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (this.isEditPage(event.url)) {

          this.courseService.getItemById(this.extractIdFromUrl(event.url))
            .subscribe(response => {
              this.courseName = response.body.title;
              console.log('Breadcrumbs course name ', this.courseName);
            });

        } else {
          this.courseName = null;
          console.warn('RegEx test for EDIT page is false');
        }
      });
  }

  isEditPage(url: string): boolean {
    const regex = new RegExp('\/courses\/[0-9]+');
    return regex.test(url);
  }

  extractIdFromUrl(url: string): number {
    return +url.substr(url.lastIndexOf('/') + 1);
  }
}
