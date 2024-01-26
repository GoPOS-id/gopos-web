export interface outUserDto {
  goid?: number;
  password?: string;
  fullname?: string;
  email?: string;
  role_id?: string;
}

export interface inUserDto {
  goid?: number;
  username?: string;
  fullname?: string;
  email?: string;
  is_verified?: boolean;
  role?: string;
  created_at?: string;
}
