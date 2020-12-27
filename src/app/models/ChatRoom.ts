import {ChatRoomUser} from './ChatRoomUser';
/*
  We need this 'items' attribute to match the exact structure of the objects returned by GraphQL.
 */
export interface ChatRoom {
  id: string;
  chatRoomUsers: {
    items: ChatRoomUser[];
  };
}
