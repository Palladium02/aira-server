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