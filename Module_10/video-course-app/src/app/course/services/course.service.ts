import { Injectable } from '@angular/core';
import { VideoCourse, Author } from '@vc-shared/shared.module';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private pageNmbr: number;
  private perPage: number;
  private srvUrl = 'https://api-video-course.azurewebsites.net/api';

  constructor(private http: HttpClient) {
    this.pageNmbr = 1;
    this.perPage = 4;
  }

  getList(): Observable<HttpResponse<{ courses: VideoCourse[] }>> {
    return this.http.get<{ courses: VideoCourse[] }>(`${this.srvUrl}/courses/${this.perPage}/${this.pageNmbr}`, { observe: 'response' });
  }

  getExactList(): Observable<VideoCourse[]> {
    return this.http.get<{ courses: VideoCourse[] }>(`${this.srvUrl}/courses/${this.perPage}/${this.pageNmbr}`, { observe: 'response' })
      .pipe(
        map((resp) => {
          console.log(resp);
          return resp.body.courses;
        })
      );
  }

  getItemById(id: number): Observable<HttpResponse<VideoCourse>> {
    return this.http.get<VideoCourse>(`${this.srvUrl}/course/${id}`, { observe: 'response' });
  }

  createItem(course: VideoCourse): Observable<HttpResponse<VideoCourse>> {
    return this.http.put<VideoCourse>(`${this.srvUrl}/course`, course, { observe: 'response' });
  }

  updateItem(course: VideoCourse): Observable<HttpResponse<VideoCourse>> {
    return this.http.patch<VideoCourse>(`${this.srvUrl}/course`, course, { observe: 'response' });
  }

  removeItem(id: number): Observable<HttpResponse<VideoCourse>> {
    return this.http.delete<VideoCourse>(`${this.srvUrl}/course/${id}`, { observe: 'response' });
  }

  getAuthors(): Observable<HttpResponse<Author[]>> {
    return this.http.get<Author[]>(`${this.srvUrl}/author`, { observe: 'response' });
  }

  searchItems(word: string): Observable<HttpResponse<VideoCourse[]>> {
    return this.http.get<VideoCourse[]>(`${this.srvUrl}/courses/search/${word}`, { observe: 'response' });
  }

  searchExactItems(word: string): Observable<VideoCourse[]> {
    return this.http.get<VideoCourse[]>(`${this.srvUrl}/courses/search/${word}`, { observe: 'response' })
      .pipe(
        map((resp) => {
          console.log(resp);
          return resp.body;
        }));
  }

  setPageNumber(pageNmbr: number): void {
    this.pageNmbr = pageNmbr;
  }

  increasePageNumber(): void {
    this.pageNmbr++;
  }

  getPageNumber(): number {
    return this.pageNmbr;
  }
}
