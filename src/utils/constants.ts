export const isProd = process.env.NODE_ENV === "production";
export const apiUrl = isProd ? "http://aiworker-01.malfin.com/api" : "http://localhost:3001"
export const localStorageKey = "bhq";
export const wsUrl = isProd ? "http://aiworker-01.malfin.com:5000/api/ws" : "ws://localhost:3001/ws";
export const wsChannelName = "ChatChannel";