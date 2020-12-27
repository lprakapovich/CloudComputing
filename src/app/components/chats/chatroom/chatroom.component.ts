import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
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
export class ChatroomComponent implements OnInit, OnChanges {
  @Input() chatRoom: ChatRoom;

  messages: Message[];
  messageContent: string;
  currentUserId: string;

  constructor(private readonly messageService: MessageService) {
    this.currentUserId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.fetchMessages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchMessages();
  }

  sendMessage(): void {
      this.messageService.sendMessage(this.chatRoom.id, this.messageContent).then((messages) => {
        console.log(messages);
    });
  }

  fetchMessages(): void {
    this.messageService.getMessagesByChatRoomId(this.chatRoom.id).then((messages) => {
      this.messages = messages;
      console.log(messages);
    });
  }
}
