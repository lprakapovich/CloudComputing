import {Component, OnInit} from '@angular/core';
import {ChatRoom} from '../../../models/ChatRoom';
import {ActivatedRoute} from '@angular/router';
import {ContactListComponent} from '../../contacts/contact-list/contact-list.component';
import {ChatListComponent} from '../chat-list/chat-list.component';
import {ChatRoomService} from '../../../services/chat-room.service';

@Component({
  selector: 'app-chat-space',
  templateUrl: './chat-space.component.html',
  styleUrls: ['./chat-space.component.css']
})
export class ChatSpaceComponent implements OnInit {

  section: string;
  chatRoomToOpen: ChatRoom;
  chatRoomToOpenId: string;
  dummyComponent;

  constructor(private route: ActivatedRoute,
              private chatRoomService: ChatRoomService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.roomId) {
        this.getChatRoom(params.roomId);
      }
      params.section === 'chats' ?
        this.dummyComponent = ChatListComponent
        : this.dummyComponent = ContactListComponent;
    });
  }

  getChatRoom(id: string): void {
    this.chatRoomService.getChatRoomById(id).then(chatRoom => {
      this.chatRoomToOpen = chatRoom;
    });
  }
}
