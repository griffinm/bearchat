interface PageUrl<T> {
  regex: RegExp;
  url: (args: T) => string;
  name: string;
}

interface PageUrlList {
  login: PageUrl<void>;
  messages: PageUrl<void>;
  notes: PageUrl<void>;
  note: PageUrl<number>;
}

export const urls: PageUrlList = {
  login: {
    name: "Login",
    regex: /\/login/,
    url: () => '/login',
  },
  messages: {
    name: "Messages",
    regex: /\/messages/,
    url: () => '/messages',
  },
  notes: {
    name: "Notes",
    regex: /\/Notes/,
    url: () => '/notes',
  },
  note: {
    regex: /\/Notes\/*/,
    url: (id: number) => `/notes/${id}`,
    name: 'Note',
  },
};