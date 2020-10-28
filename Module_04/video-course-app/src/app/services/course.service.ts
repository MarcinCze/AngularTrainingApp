import { Injectable } from '@angular/core';
import { ICourse } from '../models/icourse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  public coursesJsonUrl = 'assets/courses.json';

  getCoursesFromJson(): Observable<Array<ICourse>> {
    return this.http.get<Array<ICourse>>(this.coursesJsonUrl)
      .pipe(
        map(response => {
          response.forEach(course => {
            course.creationDate = new Date(course.creationDate);
          });
          return response;
        })
      );
  }
}
