export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Message {
  id: number,
  content: string,
  userId: number,
  conversationId: number,
  createdAt: Date,
}

export interface Conversation {
  id: number,
  users: User[],
  messages: Message[],
}

export interface Note {
  id: number,
  title: string,
  content: string,
  userId: number,
  createdAt: Date,
  updatedAt: Date,
}