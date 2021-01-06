import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  currentUser: User;
  usernameCopy: string;
  constructor() { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.usernameCopy = this.currentUser.name;
    console.log('Current user: ', this.currentUser);
  }

  loadProfileImage(): void {
    // Maxime's logic
  }
}
