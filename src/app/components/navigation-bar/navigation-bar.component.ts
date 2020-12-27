import {Component, EventEmitter, Output} from '@angular/core';
import {Section} from '../chats/chat-space/chat-space.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  @Output() signOutEvent = new EventEmitter();
  @Output() changeSectionEvent = new EventEmitter<Section>();

  signOut(): void {
    this.signOutEvent.emit();
  }

  changeSection(section: Section): void {
    this.changeSectionEvent.emit(section);
  }
}
