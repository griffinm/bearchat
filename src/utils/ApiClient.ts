import axios, { AxiosResponse } from 'axios';
import { CreateSessionResponse, User } from './types';
import { getToken } from './LocalStorage';

const baseURL = 'http://localhost:3001';

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
): Promise<AxiosResponse<CreateSessionResponse>> => {
  return await apiClient.post('/sessions.json', {
    email,
    password,
  });
}

export const fetchCurrentUser = async (): Promise<AxiosResponse<User>> => {
  return await apiClient.get('/current_user.json');
}