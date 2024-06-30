import { Login } from "../components/login/Login";

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
