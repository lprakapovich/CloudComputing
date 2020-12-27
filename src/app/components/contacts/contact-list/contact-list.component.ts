import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';
import {ChatRoomService} from '../../../services/chat-room.service';

@Component({
  selector: 'app-user-contacts',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  currentUserId: string;
  existingChatRoomId: string;

  selectedUser: User;
  users: User[];

  constructor(private userService: UserService,
              private chatRoomService: ChatRoomService) { }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId');
    this.users = [];
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().then(users => {
      this.users = users;
    });
  }

  onUserSelected(user: User): void {
    this.selectedUser = user;
    this.chatRoomExists() ? this.openExistingChatRoom() : this.createNewChatRoom();
  }

  chatRoomExists(): boolean {
    let chatExists = false;
    const chatRoomUsers = this.selectedUser.chatRoomUser.items;

    chatRoomUsers.forEach((chatRoomUser, index) => {
      chatRoomUser.chatRoom.chatRoomUsers.items.forEach((value) => {
        if (value.user.id === this.currentUserId) {
          chatExists = true;
          this.existingChatRoomId = chatRoomUsers[index].chatRoom.id;
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
    this.chatRoomService.getChatRoomById(this.existingChatRoomId).then(chatRoom => {
        console.log('ChatRoom already exists');
        console.log(chatRoom);
      }
    );
  }
}
