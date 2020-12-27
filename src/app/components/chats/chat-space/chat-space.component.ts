import {Component, Input, OnInit} from '@angular/core';
import {ChatRoom} from '../../../models/ChatRoom';
@Component({
  selector: 'app-chat-space',
  templateUrl: './chat-space.component.html',
  styleUrls: ['./chat-space.component.css']
})
export class ChatSpaceComponent implements OnInit {

  @Input() section: Section;
  chatRoomToOpen: ChatRoom;

  constructor() { }

  ngOnInit(): void {
    this.section = Section.CHAT_LIST;
  }

  openChatRoom(data): void {
    this.chatRoomToOpen = data;
  }
}

export enum Section {
  CONTACT_LIST = 2,
  CHAT_LIST = 1
}
