import { Injectable } from '@angular/core';
import {
  API,
  graphqlOperation
} from 'aws-amplify';
import {getUser} from '../custom-queries/queries';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  id: string = localStorage.getItem('userId');

   async getCurrentUser(): Promise<User> {
     const user = await API.graphql(
       graphqlOperation(
         getUser,
         {id: this.id})
     );

     // @ts-ignore
     const userData = user.data.getUser;

     console.log('User:');
     console.log(userData);

     return {
       id: userData.id,
       name: userData.name,
       status: userData.status,
       imageUri: userData.imageUri,
       chatRoomUsers: userData.chatRoomUser
     };
   }
}
