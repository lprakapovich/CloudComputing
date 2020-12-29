import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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
  @ViewChild('content') content: ElementRef;

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
    /**
     * TODO: fix automatic scrolling
     */
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line:no-unused-expression
    this.subscription.unsubscribe;
  }

  sendMessage(): void {
      this.messageService.sendMessage(this.chatRoom.id, this.messageContent).then((message) => {
        this.lastMessageInQueue = message;
        this.updateChatRoomLastMessage();
    });
  }

  private updateChatRoomLastMessage(): void {
    this.chatRoomService.updateChatRoomLastMessage(
      this.chatRoom.id, this.lastMessageInQueue.id).then(() => {});
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
}
