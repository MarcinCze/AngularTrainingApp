import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@vc-shared/shared.module';
import { AuthService } from '@vc-auth/authentication.module';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.userInfo.subscribe(user => this.user = user);
  }

  onUserLinkClick(): void {

  }

  onLogoffLinkClick(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
