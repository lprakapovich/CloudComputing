import {Component, Input, OnInit} from '@angular/core';
import { Chat, ChatService } from 'src/app/services/chat.service';
import {ChatRoom} from '../../../models/ChatRoom';
import {MessageService} from '../../../services/message.service';
import {Message} from '../../../models/Message';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
  providers: [ ChatService ]
})
export class ChatroomComponent implements OnInit {
  @Input() chatRoom: ChatRoom;

  messages: Message[];
  messageContent: string;
  currentUserId: string;

  constructor(private readonly messageService: MessageService) {
    this.currentUserId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    // this.chat = this.chatService.getMessages()
    this.messageService.getMessagesByChatRoomId(this.chatRoom.id).then((messages) => {
      this.messages = messages;
      console.log(this.messages);
    });
  }

  sendMessage(): void {
      this.messageService.sendMessage(this.chatRoom.id, this.messageContent).then((messages) => {
        console.log(messages);
    });
  }
}
