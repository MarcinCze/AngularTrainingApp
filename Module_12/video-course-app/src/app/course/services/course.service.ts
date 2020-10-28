import { Injectable } from '@angular/core';
import { VideoCourse, Author } from '@vc-shared/shared.module';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private srvUrl = 'https://api-video-course.azurewebsites.net/api';

  constructor(private http: HttpClient) { }

  getList(perPage: number, currentPage: number): Observable<HttpResponse<{ courses: VideoCourse[] }>> {
    return this.http.get<{ courses: VideoCourse[] }>(`${this.srvUrl}/courses/${perPage}/${currentPage}`, { observe: 'response' });
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
}
