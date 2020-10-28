import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  public courses: Course[];

  constructor() { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.courses = new Array<Course>();

    var a = new Course();
    a.id = 1;
    a.title = 'E-Teaching Mentoring Program';
    a.description = 'Mentoring is delivered as one-on-one meetings between the Mentor and the Mentee, focused on achieving mentoring goals agreed at the kick- off meeting.';
    a.duration = 1300;
    a.creationDate = new Date(2018, 2, 28);
    this.courses.push(a);

    var b = new Course();
    b.id = 2;
    b.title = 'EPAM eKids Program - Registration for kids';
    b.description = 'EPAM eKids program is a 12-weeks coding curriculum centered around the Scratch programming language. For advanced level groups (children 12+) we offer more complex languages: Python, JavaScript, Java, HTML, Unity. eKids help children to get practical knowledge of the programmer’s work, develop creative and engineer thinking.';
    b.duration = 750;
    b.creationDate = new Date(2019, 12, 1);
    this.courses.push(b);

    var c = new Course();
    c.id = 3;
    c.title = 'Basics of Online & Offline Presentation Excellence';
    c.description = 'This session satisfies all the basic needs of a presenter and a junior public speaker. The participants will study the core components of effective preparation and confident delivery in online and offline environment. Apart from studying different techniques, each participant will have the opportunity to practice and to receive a valuable feedback.';
    c.duration = 960;
    c.creationDate = new Date(2020, 3, 20);
    this.courses.push(c);

    var d = new Course();
    d.id = 4;
    d.title = 'TypeScript In-Depth';
    d.description = 'This training begins with TypeScript basics such as the new syntax for variable declarations and moves through all of the major features of the language including arrow functions, interfaces, classes, modules, namespaces, generics. ';
    d.duration = 600;
    d.creationDate = new Date(2019, 6, 15);
    this.courses.push(d);
  }

  onCourseEditClick(course: Course): void {
    console.log("Course edit clicked", course);
  }

  onCourseDeleteClick(course: Course): void {
    console.log("Course delete clicked", course);
  }

  onLoadMoreClick() {
    console.log("Load More btn clicked");
  }
}
