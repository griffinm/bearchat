export const isProd = process.env.NODE_ENV === "production";
export const apiUrl = isProd ? "https://bearchat.scriptmasterg.com/api" : "http://localhost:3001"
export const localStorageKey = "bhq";
export const wsUrl = isProd ? "https://bearchat.scriptmasterg.com/ws" : "ws://localhost:3001/ws";
export const wsChannelName = "ChatChannel";