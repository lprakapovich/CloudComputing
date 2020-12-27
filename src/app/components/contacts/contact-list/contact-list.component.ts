import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';
import {ChatRoomService} from '../../../services/chat-room.service';
import {ChatRoom} from '../../../models/ChatRoom';

@Component({
  selector: 'app-user-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Output() openChatRoomEvent = new EventEmitter<ChatRoom>();

  currentUserId: string;

  existingChatRoom: ChatRoom;
  selectedUser: User;
  users: User[];

  constructor(private userService: UserService,
              private chatRoomService: ChatRoomService) { }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId');
    this.users = [];
    this.fetchUsers();
  }

  public onUserSelected(user: User): void {
    this.selectedUser = user;
    this.chatRoomExists() ? this.openExistingChatRoom() : this.createNewChatRoom();
  }

  private fetchUsers(): void {
    this.userService.getAllUsers().then(users => {
      this.users = users;
    });
  }

  private chatRoomExists(): boolean {
    let chatExists = false;
    const chatRoomUsers = this.selectedUser.chatRoomUser.items;

    chatRoomUsers.forEach((chatRoomUser, index) => {
      chatRoomUser.chatRoom.chatRoomUsers.items.forEach((value) => {
        if (value.user.id === this.currentUserId) {
          chatExists = true;
          this.existingChatRoom = chatRoomUsers[index].chatRoom;
        }
      });
    });
    return chatExists;
  }

  private createNewChatRoom(): void {
    this.chatRoomService.createChatRoomWith(this.selectedUser).then(chatRoom => {

      /**
       * // TODO: replace with subscriptions
       * Each time the collection changes, it is fetched from API automatically
       */
      this.userService.getAllUsers().then(users => {
        this.users = users;
        console.log('ChatRoom room was created');
        console.log(chatRoom);
      });
    });
  }

  private openExistingChatRoom(): void {
    this.openChatRoomEvent.emit(this.existingChatRoom);
  }
}
