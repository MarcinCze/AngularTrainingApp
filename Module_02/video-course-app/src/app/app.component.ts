import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'video-course-app';

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    var pckg = require('./../../package.json');
    this.titleService.setTitle(`VideoCourse ${pckg.version} - ${pckg.description}`);
  }


}
