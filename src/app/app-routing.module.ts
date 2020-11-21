import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatroomComponent} from './components/chatroom/chatroom.component';

const routes: Routes = [
  {
    path: 'components/chatroom', component: ChatroomComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
