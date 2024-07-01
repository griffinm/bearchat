export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface CreateSessionResponse {
  token: {
    type: string;
    value: string;
  };
  user: User;
}
