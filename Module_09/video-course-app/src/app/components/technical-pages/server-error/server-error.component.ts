import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {

  public title = 'Oops!';
  public code = 'Technical issue';
  public messageLine1 = 'The page you are looking for cannot connect to the server.';
  public messageLine2 = 'Please try again later.';

  constructor() { }

  ngOnInit(): void {
  }

}
