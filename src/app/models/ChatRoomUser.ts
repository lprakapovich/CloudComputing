import {User} from './User';
import {ChatRoom} from './ChatRoom';

export interface ChatRoomUser {
  id: string;
  userID: string;
  chatRoomID: string;
  user: User;
  chatRoom: ChatRoom;
}
