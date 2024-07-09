export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateSessionResponse {
  token: string,
  user: User,
}
