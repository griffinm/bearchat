interface PageUrl {
  [key: string]: {
    regex: RegExp;
    url: () => string;
    name: string;
  }
}

export const urls:PageUrl = {
  login: {
    name: "Login",
    regex: /\/login/,
    url: () => '/login',
  },
  chat: {
    name: "Chat",
    regex: /\/chat/,
    url: () => '/chat',
  }
}