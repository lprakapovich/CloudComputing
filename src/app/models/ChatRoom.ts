import {ChatRoomUser} from './ChatRoomUser';
import {Message} from './Message';

export interface ChatRoom {
  id: string;
  lastMessageId: string;
  lastMessage: Message;
  chatRoomUsers: {
    items: ChatRoomUser[];
  };
}
