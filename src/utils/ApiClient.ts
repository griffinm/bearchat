import axios, { AxiosResponse } from 'axios';
import { 
  Conversation, 
  Message, 
  Note, 
  User,
} from './types';
import { getToken } from './LocalStorage';
import { apiUrl } from './constants';

const baseURL = apiUrl;

const apiClient = axios.create({
  baseURL: baseURL,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['x-bc-token'] = token;
  }
  return config;
});

apiClient.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    window.location.href = '/login';
  }
});

export const createSession = async (
  email: string, 
  password: string
): Promise<AxiosResponse<{ token: string, user: User }>> => {
  return await apiClient.post('/sessions.json', {
    email,
    password,
  });
}

export const fetchCurrentUser = async (): Promise<AxiosResponse<User>> => {
  return await apiClient.get('/current_user.json');
}

export const updateCurrentUser = async (fcmToken: string): Promise<AxiosResponse<User>> => {
  return await apiClient.post('/current_user.json', {
    user: { fcm_token: fcmToken },
  });
}

export const fetchConversations = async (): Promise<AxiosResponse<Conversation[]>> => {
  return await apiClient.get('/conversations.json');
}

export const createMessage = async (
  message: string,
  conversationId: number,
): Promise<AxiosResponse<Message>> => {
  // If there is a newline char at thje end of the message, remove it
  const trimmedMessage = message.replace(/\n$/, '');

  return await apiClient.post(`/conversations/${conversationId}/messages.json`, {
    message: {
      content: trimmedMessage,
    },
  });
}

export const fetchMessages = async (
  conversationId: number,
): Promise<AxiosResponse<Message[]>> => {
  return await apiClient.get(`/conversations/${conversationId}/messages.json`);
}

export const fetchNotes = async (): Promise<AxiosResponse<Note[]>> => {
  return await apiClient.get('/notes.json');
}

export const fetchNote = async(id: string): Promise<AxiosResponse<Note>> => {
  return apiClient.get(`/notes/${id}.json`);
}

export const createNote = async (): Promise<AxiosResponse<Note>> => {
  return await apiClient.post('/notes.json');
}

export const updateNote = (note: Note): Promise<AxiosResponse<Note>> => {
  const params = {
    note: {
      title: note.title,
      content: note.content,
    }
  }

  return apiClient.put(`/notes/${note.id}.json`, { note: params.note });
}

export const deleteNote = (note: Note): Promise<AxiosResponse> => {
  return apiClient.delete(`/notes/${note.id}.json`);
}

export const markMessageAsRead = async (
  messageId: number, 
  conversationId: number
): Promise<AxiosResponse> => {
  const data = {
    message: {
      read_at: new Date(),
    }
  }

  return await apiClient.patch(
    `conversations/${conversationId}/messages/${messageId}.json`,
    data,
  )
}