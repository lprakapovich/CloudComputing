import {Injectable} from '@angular/core';
import {Storage, API, graphqlOperation} from 'aws-amplify';
import {getUser, listUsers} from '../custom-queries/queries';
import {User} from '../models/User';
import config from './aws-exports'

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];

  currentUserId: string = localStorage.getItem('userId');

   async getCurrentUser(): Promise<User> {
     const user = await API.graphql(
       graphqlOperation(
         getUser,
         {id: this.currentUserId})
     );

     // @ts-ignore
     const userData = user.data.getUser;
     return {
       id: userData.id,
       name: userData.name,
       status: userData.status,
       imageUri: userData.imageUri,
       chatRoomUser: userData.chatRoomUser,
       email: userData.email
     };
   }

   async getAllUsers(): Promise<User[]> {
     const users = await API.graphql(
       graphqlOperation(
         listUsers
       )
     );
     // @ts-ignore
     return users.data.listUsers.items.filter(u => u.id !== this.currentUserId);
   }
}
