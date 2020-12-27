import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../models/Message';

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.css']
})
export class MessageBubbleComponent implements OnInit {
  @Input() message: Message;

  currentUserId: string;

  constructor() {
    this.currentUserId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
  }
}
