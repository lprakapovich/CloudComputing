import {Injectable} from '@angular/core';
import {API, Auth, graphqlOperation} from 'aws-amplify';

import {getUser} from '../../graphql/queries';
import {createUser} from '../../graphql/mutations';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async isAuthenticated(): Promise<any> {
    const isAuth = await Auth.currentAuthenticatedUser({bypassCache: true});

    localStorage.setItem('userId', isAuth.attributes.sub);

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
    await Auth.signOut({global: true})
      .then(() =>
        localStorage.setItem('userId', null));
  }
}
