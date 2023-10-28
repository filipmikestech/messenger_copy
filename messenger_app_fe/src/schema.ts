export interface User {
  id: string;
  name: string;
  ConversationOwner: Conversation[] | null;
  ConversationJoiner: Conversation[] | null;
  Messages: Messages[] | null;
}

export interface Conversation {
  id: string;
  owner: User;
  joiner: User;
  userIdOwner: string;
  userIdJoiner: string;
  Messages: Messages[] | null;
}

export interface Messages {
  id: string;
  user: User;
  userId: string;
  conversation: Conversation;
  message: string;
  conversationId: string;
}
