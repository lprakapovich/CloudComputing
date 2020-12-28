import {Injectable} from '@angular/core';
import {ChatRoom} from '../models/ChatRoom';
import {User} from '../models/User';

import {API, graphqlOperation} from 'aws-amplify';
import {getChatRoom, getUser} from '../custom-queries/queries';
import {createChatRoom, createChatRoomUser, updateChatRoom} from '../../graphql/mutations';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  id: string = localStorage.getItem('userId');

  async getCurrentUserChatRooms(): Promise<ChatRoom[]> {
    const user = await API.graphql(
      graphqlOperation(
        getUser,
        {id: this.id})
    );

    // @ts-ignore
    const userData = user.data.getUser;
    const chatRooms = [];

    userData.chatRoomUser.items.forEach((chatRoomUser) => {
      chatRooms.push(chatRoomUser.chatRoom);
    });
    return chatRooms;
  }

  async createChatRoomWith(anotherUser: User): Promise<ChatRoom> {
    const newChatRoomData = await API.graphql(
      graphqlOperation(
        createChatRoom, { input: {
          lastMessageID: 0
        }}
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

  async updateChatRoomLastMessage(chatRoomId: string, messageId: string): Promise<any> {
    await API.graphql(
      graphqlOperation(
        updateChatRoom,
        {
          input: {
          id: chatRoomId,
          lastMessageID: messageId
        }
      }
    ));
  }
}
