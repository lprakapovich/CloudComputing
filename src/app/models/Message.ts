import {User} from './User';
import {ChatRoom} from './ChatRoom';

export interface Message {
  id: string;
  createdAt: string;
  content: string;
  userID: string;
  chatRoomID: string;
  user: User;
  chatRoom: ChatRoom;
}
