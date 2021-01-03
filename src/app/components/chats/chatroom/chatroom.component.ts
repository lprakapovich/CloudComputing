import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ChatRoom} from '../../../models/ChatRoom';
import {MessageService} from '../../../services/message.service';
import {Message} from '../../../models/Message';
import {ChatRoomService} from '../../../services/chat-room.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
})
export class ChatroomComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() chatRoom: ChatRoom;
  @ViewChild('scrollFrame', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('message') messageElements: QueryList<any>;

  scrollContainer: any;
  isNearBottom: boolean;

  messages: Message[];
  lastMessageInQueue: Message;

  messageContent: string;
  currentUserId: string;

  subscription;

  constructor(private readonly messageService: MessageService,
              private readonly chatRoomService: ChatRoomService) {
    this.currentUserId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.subscription = this.messageService.subscribeOnCreateMessage();
    this.subscription.subscribe({
      next: (data) => {
        const newMessage = data.value.data.onCreateMessage;
        if (newMessage.chatRoom.id !== this.chatRoom.id) {
          return;
        }
        this.messages.push(newMessage);
      }
    });
    this.fetchMessages();
  }

  ngOnChanges(changes: SimpleChanges): void {
   this.fetchMessages();
  }

  ngAfterViewInit(): void {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.messageElements.changes.subscribe(_ => this.onMessageElementChanged());
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line:no-unused-expression
    this.subscription.unsubscribe;
  }

  onMessageElementChanged(): void {
     if (this.isUserNearBottom()) {
      this.scrollToBottom();
     }
  }

  scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
  }

  isUserNearBottom(): boolean {
    const threshold = 150;
    const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;
    return position > height - threshold;
  }

  sendMessage(): void {
    if (this.nonEmpty()) {
      this.messageService.sendMessage(this.chatRoom.id, this.messageContent).then((message) => {
        this.lastMessageInQueue = message;
        this.updateChatRoomLastMessage();
        this.resetInputForm();
      });
    }
  }

  private updateChatRoomLastMessage(): void {
    this.chatRoomService.updateChatRoomLastMessage(
      this.chatRoom.id, this.lastMessageInQueue.id).then(() => {});
  }

  private nonEmpty(): boolean {
    return this.messageContent.length > 0;
  }

  private resetInputForm(): void {
    this.messageContent = '';
  }

  fetchMessages(): void {
    this.messageService.getMessagesByChatRoomId(this.chatRoom.id).then((messages) => {
      this.messages = messages;
    });
  }

  getTitle(): string {
    return this.chatRoom.chatRoomUsers.items.find(
      u => u.user?.id !== this.currentUserId).user?.name;
  }

  attachFile(): void {

  }
}
