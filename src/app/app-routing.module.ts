import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatroomComponent} from './components/chats/chatroom/chatroom.component';
import {ContactListComponent} from './components/contacts/contact-list/contact-list.component';
import {SettingsComponent} from './components/settings/settings.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'chatroom', component: ChatroomComponent },
  { path: 'user-contacts', component: ContactListComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'user-settings', component: SettingsComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
