import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatroomComponent} from './components/chats/chatroom/chatroom.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {ChatSpaceComponent} from './components/chats/chat-space/chat-space.component';

const routes: Routes = [
  // { path: 'chat-space', component: ChatSpaceComponent},
  // { path: 'user-profile', component: UserProfileComponent },
  // { path: 'user-settings', component: ChatSpaceComponent },
  // { path: 'chatroom', component: ChatroomComponent },
  { path: '', redirectTo: 'chat-space', pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
