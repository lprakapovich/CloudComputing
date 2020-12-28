import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';
import {ChatRoomService} from '../../../services/chat-room.service';
import {ChatRoom} from '../../../models/ChatRoom';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-user-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  currentUserId: string;
  existingChatRoom: ChatRoom;
  selectedUser: User;
  users: User[];

  constructor(private userService: UserService,
              private chatRoomService: ChatRoomService,
              private router: Router) { }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId');
    this.users = [];
    this.fetchUsers();
  }

  private fetchUsers(): void {
    this.userService.getAllUsers().then(users => {
      this.users = users;
    });
  }

  public onUserSelected(user: User): void {
    this.selectedUser = user;
    this.chatRoomExists() ? this.openExistingChatRoom() : this.createNewChatRoom();
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
    this.chatRoomService.createChatRoomWith(this.selectedUser).then(() => {
      /**
       * // TODO: replace with subscriptions
       */

      this.userService.getAllUsers().then(users => {
        this.users = users;
      });
    });
  }

  private openExistingChatRoom(): void {
    const extras: NavigationExtras = {
      queryParams: {
          section: 'contacts',
          roomId: this.existingChatRoom.id
        }
    };
    this.router.navigate(['/chat-space'], extras);
  }
}
