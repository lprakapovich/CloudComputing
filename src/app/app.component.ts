import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Section} from './components/chats/chat-space/chat-space.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cloudchat-app';
  isAuthenticated: boolean;
  section: Section;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().then(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  changeComponent(data): void {
    this.section = data;
    console.log(this.section);
  }
}
