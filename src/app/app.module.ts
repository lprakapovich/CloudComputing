import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { ChatroomComponent } from './components/chats/chatroom/chatroom.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ContactListComponent } from './components/contacts/contact-list/contact-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ChatListComponent } from './components/chats/chat-list/chat-list.component';
import { ChatListItemComponent } from './components/chats/chat-list-item/chat-list-item.component';
import { ContactListItemComponent } from './components/contacts/contact-list-item/contact-list-item.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    ChatroomComponent,
    NavigationBarComponent,
    UserProfileComponent,
    SettingsComponent,
    ChatListComponent,
    ChatListItemComponent,
    ContactListComponent,
    ContactListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyUIAngularModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
