import { Component, OnInit } from '@angular/core';
import { Chat, ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
  providers: [ ChatService ]
})
export class ChatroomComponent implements OnInit {
  public chat: Chat[];

  constructor(private readonly ChatService: ChatService) {
  }

  ngOnInit(): void {
    this.chat = this.ChatService.getMessages();
  }
}
