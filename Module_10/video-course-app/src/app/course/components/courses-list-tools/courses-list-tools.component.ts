import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list-tools',
  templateUrl: './courses-list-tools.component.html',
  styleUrls: ['./courses-list-tools.component.css']
})
export class CoursesListToolsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  onAddBtnClick(): void {
    this.router.navigate(['/courses/new']);
  }

}
