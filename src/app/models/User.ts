import { ChatRoomUser } from './ChatRoomUser';

export interface User {
  id: string;
  name: string;
  email: string;
  imageUri: {
    bucket: string,
    region: string,
    key: string
  };
  status: string;
  chatRoomUser: {
    items: ChatRoomUser[];
  };
}
