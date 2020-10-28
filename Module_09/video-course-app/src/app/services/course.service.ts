import { Injectable } from '@angular/core';
import { VideoCourse } from '../models/video-course';
import { Author } from '../models/author';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
