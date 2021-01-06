import {ChatRoomUser} from './ChatRoomUser';

export interface User {
  id: string;
  name: string;
  email: string;
  imageUri: string;
  status: string;
  chatRoomUser: {
    items: ChatRoomUser[];
  };
}
