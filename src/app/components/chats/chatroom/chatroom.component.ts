import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ChatService} from 'src/app/services/chat.service';
import {ChatRoom} from '../../../models/ChatRoom';
import {MessageService} from '../../../services/message.service';
import {Message} from '../../../models/Message';
import {ChatRoomService} from '../../../services/chat-room.service';
import {API, graphqlOperation} from 'aws-amplify';
import {onCreateMessage} from '../../../../graphql/subscriptions';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
  providers: [ ChatService ]
})
export class ChatroomComponent implements OnInit, OnChanges, OnDestroy {
  @Input() chatRoom: ChatRoom;

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
    this.subscription = API.graphql(graphqlOperation(onCreateMessage));
    this.subscription.subscribe({
      next: (data) => {
        const newMessage = data.value.data.onCreateMessage;
        console.log(newMessage);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sendMessage(): void {
      this.messageService.sendMessage(this.chatRoom.id, this.messageContent).then((message) => {
        this.lastMessageInQueue = message;
        this.updateChatRoomLastMessage();
    });
  }

  private updateChatRoomLastMessage(): void {
    this.chatRoomService.updateChatRoomLastMessage(
      this.chatRoom.id, this.lastMessageInQueue.id).then(() => {
    });
  }

  fetchMessages(): void {
    this.messageService.getMessagesByChatRoomId(this.chatRoom.id).then((messages) => {
      this.messages = messages;
    });
  }

  getTitle(): string {
    return this.chatRoom.chatRoomUsers.items.find(
      u => u.user.id !== this.currentUserId).user.name;
  }
}
