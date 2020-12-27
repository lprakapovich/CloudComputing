import {Injectable} from '@angular/core';
import {ChatRoom} from '../models/ChatRoom';
import {User} from '../models/User';

import {API, graphqlOperation} from 'aws-amplify';
import {getUser} from '../custom-queries/queries';
import {getChatRoom} from '../../graphql/queries';
import {createChatRoom, createChatRoomUser} from '../../graphql/mutations';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  chatRooms: ChatRoom[] = [];
  id: string = localStorage.getItem('userId');

  constructor() { }

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

  async createChatRoomWith(anotherUser: User): Promise<ChatRoom> {
    const newChatRoomData = await API.graphql(
      graphqlOperation(
        createChatRoom, { input: {}}
      )
    );
    if (!newChatRoomData) {
      return;
    }
    // @ts-ignore
    const newChatRoom = newChatRoomData.data.createChatRoom;

    await API.graphql(
      graphqlOperation(
      createChatRoomUser,
        {
          input: {
            userID: this.id,
            chatRoomID: newChatRoom.id
          }
        }
    ));
    await API.graphql(
      graphqlOperation(
        createChatRoomUser,
        {
          input: {
            userID: anotherUser.id,
            chatRoomID: newChatRoom.id
          }
        }
      )
    );
    const created = await API.graphql(
      graphqlOperation(
        getChatRoom,
        {
          id: newChatRoom.id
        }
      )
    );

    // @ts-ignore
    return created.data.getChatRoom;
  }
  async getChatRoomById(id: string): Promise<ChatRoom> {
    const chatRoom = await API.graphql(
      graphqlOperation(
        getChatRoom,
        {
          id
        }
      )
    );

    // @ts-ignore
    return chatRoom.data.getChatRoom;
  }
}
