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
  readAt?: Date,
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

export type TypingNotificationData = {
  userId: number,
  conversationId: number,
}

export type WsNotification = {
  type: 'message' | 'typing' | 'mark_as_read',
  data: Message | TypingNotificationData | Date,
}