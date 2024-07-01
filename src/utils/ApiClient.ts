import axios, { AxiosResponse } from 'axios';
import { CreateSessionResponse } from './types';

const baseURL = 'http://localhost:3333';

const apiClient = axios.create({
  baseURL: baseURL,
});

export const createSession = async (
  email: string, 
  password: string
): Promise<AxiosResponse<CreateSessionResponse>> => {
  return await apiClient.post('/sessions', {
    email,
    password,
  });
}
