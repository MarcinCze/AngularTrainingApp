import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '@vc-auth/authentication.module';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent implements OnInit, DoCheck {

  isLogged: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLogged.subscribe(logged => this.isLogged = logged);
  }

  ngDoCheck(): void {
    this.authService.isLogged.subscribe(logged => this.isLogged = logged);
  }

}
