import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})


export class ChatListComponent implements OnInit {
  fromDate: Date;
  toDate: Date;
  startDate = new Date(2020, 12, 1);
  constructor() {
  }

  ngOnInit(): void {
  }

  setDatesAsSelected(fromInput, toInput): void {
    this.fromDate = fromInput.value;
    this.toDate = toInput.value;
  }

  resetDates(fromInput, toInput): void {
    fromInput.value = '';
    toInput.value = '';
  }

  // for now we store and reset the dates

}
