import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-courses-list-tools',
  templateUrl: './courses-list-tools.component.html',
  styleUrls: ['./courses-list-tools.component.css']
})
export class CoursesListToolsComponent implements OnInit {
  @Output() clickFind = new EventEmitter<string>();

  public searchText: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSearchBtnClick(): void {
    console.log(`Search text: ${this.searchText}`);
    this.clickFind.emit(this.searchText);
  }
}
