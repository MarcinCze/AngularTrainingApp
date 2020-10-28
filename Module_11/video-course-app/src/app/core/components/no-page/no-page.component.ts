import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-page',
  templateUrl: './no-page.component.html',
  styleUrls: ['./no-page.component.css']
})
export class NoPageComponent implements OnInit {

  public title = 'Oops!';
  public code = '404 - page not found';
  public messageLine1 = 'The page you are looking for might have been removed,';
  public messageLine2 = 'had its name changed or is temporarily unavailable.';

  constructor() { }

  ngOnInit(): void {
  }

}
