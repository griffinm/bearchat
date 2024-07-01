import { Login } from "../pages/login/Login";

interface PageUrl {
  regex: RegExp;
  url: () => string;
  name: string;
  component: () => JSX.Element;
}

export const urls:PageUrl[] = [
  {
    name: "Login",
    regex: /\/login/,
    url: () => '/login',
    component: Login
  }
]

export const defaultPage = urls[0];
