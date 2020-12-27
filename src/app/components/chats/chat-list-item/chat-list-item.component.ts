import {Component, Input, OnInit} from '@angular/core';
import {ChatRoom} from '../../../models/ChatRoom';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.css']
})
export class ChatListItemComponent implements OnInit {

  @Input() chatRoom: ChatRoom;

  chatRoomTitle: string;
  currentUserId: string;
  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId');
    this.chatRoomTitle = this.getChatRoomTitle();
    console.log('lastMessage:', this.chatRoom);
  }

  getChatRoomTitle(): string {
    return this.chatRoom.chatRoomUsers.items.find(u => u.user.id !== this.currentUserId).user.name;
  }
}
