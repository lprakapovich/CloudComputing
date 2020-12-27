import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../models/Message';
import {MessageService} from '../../../services/message.service';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css']
})
export class ChatBubbleComponent implements OnInit {
  @Input() message: Message;

  currentUserId: string;

  constructor() {
    this.currentUserId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
  }

}
