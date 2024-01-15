export interface User {
  id: string;
  name: string;
  Messages: Message[] | null;
  Conversations: Conversation[] | null;
}

export interface Conversation {
  id: string;
  Users: User[] | null;
  Messages: Message[] | null;
}

export interface Message {
  id: string;
  user: User;
  userId: string;
  conversation: Conversation;
  text: string;
  conversationId: string;
  created: Date;
}
