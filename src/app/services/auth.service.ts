import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';

import {
  API,
  graphqlOperation
} from 'aws-amplify';

import {getUser} from '../../graphql/queries';
import {createUser} from '../../graphql/mutations';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // bypassCache ensures user info is taken directly from the server, rather than from cache
  async isAuthenticated(): Promise<any> {
    const isAuth = await Auth.currentAuthenticatedUser({bypassCache: true});

    const userData = await API.graphql(
      graphqlOperation(
        getUser,
      { id: isAuth.attributes.sub}));

    // @ts-ignore
    if (!userData.data.getUser) {
      const user = {
        id: isAuth.attributes.sub,
        name: isAuth.username
      };
      await API.graphql(
        graphqlOperation(
          createUser,
        { input: user
        }));
    }

    return isAuth;
  }

  async signOut(): Promise<void> {
     await Auth.signOut({global: true});
  }
}
