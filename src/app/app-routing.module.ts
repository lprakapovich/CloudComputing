import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatroomComponent} from './components/chats/chatroom/chatroom.component';
import {ContactListComponent} from './components/contacts/contact-list/contact-list.component';
import {SettingsComponent} from './components/settings/settings.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {ChatListComponent} from './components/chats/chat-list/chat-list.component';

const routes: Routes = [
  { path: 'chat-list', component: ChatListComponent },
  { path: 'user-contacts', component: ContactListComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'user-settings', component: SettingsComponent },
  { path: 'chatroom', component: ChatroomComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
