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
  messages: {
    name: "Messages",
    regex: /\/messages/,
    url: () => '/messages',
  }
}