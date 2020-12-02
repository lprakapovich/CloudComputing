import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  @Output() signOutEvent = new EventEmitter();

  ngOnInit(): void {
  }

  signOut(): void {
    this.signOutEvent.emit();
  }

}
