import EventEmitter from "events";
export interface SessionOptions {
  email: string;
  username: string;
  id: string;
  emitter: EventEmitter;
}

export interface SessionInfo {
  email: string;
  id: string;
}

export interface LoginResponse {
  id: string | null;
  error: {
    description: string,
    date: number
  } | null
}