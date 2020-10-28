import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-list-tools',
  templateUrl: './courses-list-tools.component.html',
  styleUrls: ['./courses-list-tools.component.css']
})
export class CoursesListToolsComponent implements OnInit {

  public searchText: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSearchBtnClick(): void {
    console.log("Search text:", this.searchText);
  }
}
