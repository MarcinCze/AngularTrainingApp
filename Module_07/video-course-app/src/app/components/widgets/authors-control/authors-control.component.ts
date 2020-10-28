import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';

@Component({
  selector: 'app-authors-control',
  templateUrl: './authors-control.component.html',
  styleUrls: ['./authors-control.component.css']
})
export class AuthorsControlComponent implements OnInit {

  public value: Author[];

  constructor() { }

  ngOnInit(): void {
  }

}
