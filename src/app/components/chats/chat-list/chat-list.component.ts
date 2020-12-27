import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ChatRoom} from '../../../models/ChatRoom';
import {ChatRoomService} from '../../../services/chat-room.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})


export class ChatListComponent implements OnInit {
  @Output() openChatRoomEvent = new EventEmitter<ChatRoom>();

  fromDate: Date;
  toDate: Date;
  startDate = new Date(2020, 1, 1);

  chatRooms: ChatRoom[];

  constructor(private userService: UserService,
              private chatRoomService: ChatRoomService) {
  }

  ngOnInit(): void {
    this.chatRooms = null;
    this.chatRoomService.getCurrentUserChatRooms().then(chatRooms => {
      console.log('Fetched chatrooms: ', chatRooms);
      this.chatRooms = chatRooms;
    });
  }

  openChatRoom(chatroom: ChatRoom): void {
    this.openChatRoomEvent.emit(chatroom);
  }

  setDatesAsSelected(fromInput, toInput): void {
    this.fromDate = fromInput.value;
    this.toDate = toInput.value;
  }

  resetDates(fromInput, toInput): void {
    fromInput.value = '';
    toInput.value = '';
  }
  // for now we store and reset the dates
  // clearing the dates in the calendar view should be added

}
