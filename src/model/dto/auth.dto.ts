import { Role } from '../../model/enum/role.enum';

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number; // seconds
}

export interface MeResponse {
  id: string;
  email: string;
  name: string;
  roles: Role[];
}
