import { Injectable } from '@angular/core';
import {Message} from '../models/Message';
import {API, graphqlOperation} from 'aws-amplify';
import {createMessage} from '../../graphql/mutations';
import {messagesByChatRoom} from '../../graphql/queries';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  userId = localStorage.getItem('userId');

  async sendMessage(chatRoomId: string, content: string): Promise<Message> {
    const message = await API.graphql(graphqlOperation(
      createMessage,
      {
        input: {
          content,
          userID: this.userId,
          chatRoomID: chatRoomId
        }
      }
    ));
    // @ts-ignore
    return message.data.createMessage;
  }

  async getMessagesByChatRoomId(id: string): Promise<Message[]> {
    const messages = await API.graphql(graphqlOperation(
      messagesByChatRoom, {
        chatRoomID: id
      }
    ));
    // @ts-ignore
    return messages.data.messagesByChatRoom.items;
  }
}

