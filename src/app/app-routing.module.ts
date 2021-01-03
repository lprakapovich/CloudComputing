import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {ChatSpaceComponent} from './components/chats/chat-space/chat-space.component';
import {SettingsComponent} from './components/settings/settings.component';

const routes: Routes = [
  { path: 'chat-space', component: ChatSpaceComponent},
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'user-settings', component: SettingsComponent },
  { path: '', redirectTo: 'chat-space', data: { section: 'chats' }, pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
