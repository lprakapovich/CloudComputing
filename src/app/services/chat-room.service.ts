import { Injectable } from '@angular/core';

import {ChatRoom} from '../models/ChatRoom';
import {UserService} from './user.service';
import {API, graphqlOperation} from 'aws-amplify';
import {getUser} from '../custom-queries/queries';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  chatRooms: ChatRoom[] = [];
  id: string = localStorage.getItem('userId');

  constructor(private userService: UserService) { }

  async getCurrentUserChatRooms(): Promise<ChatRoom[]> {
    const user = await API.graphql(
      graphqlOperation(
        getUser,
        {id: this.id})
    );

    // @ts-ignore
    const userData = user.data.getUser;

    userData.chatRoomUser.items.forEach((chatRoomUser) => {
      this.chatRooms.push(chatRoomUser.chatRoom);
    });

    return this.chatRooms;
  }
}
