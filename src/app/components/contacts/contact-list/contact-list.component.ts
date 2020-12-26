import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-contacts',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  id: string;
  constructor() { }

  ngOnInit(): void {
    this.id = localStorage.getItem('userId');
  }

  onAddContact(): void {
    // angular material pop up to add a new user
  }

  onCreateChatRoom(): void {

  }
}
