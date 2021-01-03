import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ChatRoom} from '../../../models/ChatRoom';
import {ChatRoomService} from '../../../services/chat-room.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})

export class ChatListComponent implements OnInit, OnDestroy {
  fromDate: Date;
  toDate: Date;
  startDate = new Date(2020, 1, 1);

  chatRooms: ChatRoom[];

  constructor(private userService: UserService,
              private chatRoomService: ChatRoomService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.chatRooms = [];
    this.fetchChatRooms();
  }

  private fetchChatRooms(): void {
    this.chatRoomService.getCurrentUserChatRooms().then(chatRooms => {
      this.chatRooms = chatRooms;
      this.openFirstChatInQueue();
    });
  }

  private openFirstChatInQueue(): void {
    if (this.chatRooms[0]) {
      this.openChatRoom(this.chatRooms[0]);
    }
  }

  ngOnDestroy(): void {
    this.chatRooms = [];
  }

  openChatRoom(chatroom: ChatRoom): void {
    const extras: NavigationExtras = {
      queryParams: {
        section: 'chats',
        roomId: chatroom.id
      }
    };
    this.router.navigate(['/chat-space'], extras);
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
