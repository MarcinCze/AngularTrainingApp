import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClientStatusService } from '@vc-core/core.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'video-course-app';

  constructor(private titleService: Title, public clientService: HttpClientStatusService) { }

  ngOnInit(): void {
    const pckg = require('./../../package.json');
    this.titleService.setTitle(`VideoCourse ${pckg.version} - ${pckg.description}`);
  }

}
