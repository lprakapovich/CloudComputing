import {ChatRoomUser} from './ChatRoomUser';

export interface User {
  id: string;
  name: string;
  imageUri: string;
  status: string;
  chatRoomUsers: ChatRoomUser[];
}
