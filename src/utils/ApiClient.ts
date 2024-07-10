import axios, { AxiosResponse } from 'axios';
import { 
  Conversation, 
  Message, 
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
  if (error.status === 401) {
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