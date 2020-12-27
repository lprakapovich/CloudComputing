export interface Chat {
  name: string;
  messages: string[];
  incoming: boolean;
}

export class ChatService {
  private chat: Chat[] = [];

  constructor() {
    this.chat = [{ name: 'hi', messages: ["hello world"], incoming: true }];
  }

  getMessages() {
    return this.chat;
  }
}
