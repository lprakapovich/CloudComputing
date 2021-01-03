import {Component, Input, OnInit} from '@angular/core';
import {ChatRoom} from '../../../models/ChatRoom';
import {MessageService} from '../../../services/message.service';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.css']
})
export class ChatListItemComponent implements OnInit {

  @Input() chatRoom: ChatRoom;

  chatRoomTitle: string;
  lastMessageContent: string;
  currentUserId: string;
  subscription;

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId');
    this.chatRoomTitle = this.getChatRoomTitle();
    this.lastMessageContent = this.getLastMessageContent();

    this.subscription = this.messageService.subscribeOnCreateMessage();
    this.subscription.subscribe({
      next: (data) => {
        const newMessage = data.value.data.onCreateMessage;
        if (newMessage.chatRoom.id !== this.chatRoom.id) {
          return;
        }
        this.chatRoom.lastMessage = newMessage;
        this.lastMessageContent = this.getLastMessageContent();
      }
    });
  }

  getChatRoomTitle(): string {
    return this.chatRoom.chatRoomUsers.items.find(u => u.user.id !== this.currentUserId).user.name;
  }

  getLastMessageContent(): string {
    if (!this.chatRoom.lastMessage) {
      return 'No messages yet.';
    }

    const lastMessage = this.chatRoom.lastMessage;
    const sender = lastMessage.userID !== this.currentUserId ? lastMessage.user.name : 'You';
    return `${sender}: ${lastMessage.content}`;
  }
}
