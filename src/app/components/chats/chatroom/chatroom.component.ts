import {Component, Input, OnInit} from '@angular/core';
import { Chat, ChatService } from 'src/app/services/chat.service';
import {ChatRoom} from '../../../models/ChatRoom';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
  providers: [ ChatService ]
})
export class ChatroomComponent implements OnInit {
  @Input() chatRoom: ChatRoom;

  chat: Chat[];
  message: string;

  constructor(private readonly chatService: ChatService) {
  }

  ngOnInit(): void {
    // this.chat = this.chatService.getMessages();
  }

  sendMessage(): void {

  }
}
