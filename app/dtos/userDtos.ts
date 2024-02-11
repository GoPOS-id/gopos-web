import { inPagination } from "./pagination";

type roles = "operator" | "administrator" | "cashier";

export interface outUserDto {
  id?: number;
  username?: string;
  password?: string;
  fullname?: string;
  email?: string;
  role?: roles;
  role_id?: number;
  created_at?: string;
  verified_at?: string;
}

export interface inUserDto {
  id?: number;
  username?: string;
  password?: string;
  fullname?: string;
  email?: string;
  role?: roles;
  created_at?: string;
  verified_at?: string;
}

export interface inUserAllDto {
  users: inUserDto[];
  pagination: inPagination;
}

export interface outCreateUserDto {
  username?: string;
  password?: string;
  fullname?: string;
  email?: string;
  role_id?: number;
}

export interface inCreateUserDto {
  username?: string;
  fullname?: string;
  email: string;
  is_verified: boolean;
  role: roles;
}
