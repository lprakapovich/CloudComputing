import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-contacts',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onAddContact(): void {
    // angular material pop up to add a new user
  }
}
