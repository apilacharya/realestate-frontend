export type Role = 'USER' | 'ADMIN';

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
}
