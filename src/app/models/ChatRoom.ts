import {ChatRoomUser} from './ChatRoomUser';

/*
  We need this 'items' attribute to match the exact structure of graphQL returned types.
 */

export interface ChatRoom {
  id: string;
  chatRoomUsers: {
    items: ChatRoomUser[];
  };
}
