import {Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth.service';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cloudchat-app';
  isAuthenticated: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().then(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
