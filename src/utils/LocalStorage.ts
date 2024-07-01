import { localStorageKey } from "./constants";

const tokenKey = `${localStorageKey}_token`;

export function setToken(token: string) {
  localStorage.setItem(tokenKey, token);
}

export function getToken(): string {
  return localStorage.getItem(tokenKey) || "";
}
