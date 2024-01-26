interface LoginDto {
  username?: string;
  password?: string;
}
interface InLoginDto {
  goid?: number;
  username?: string;
  fullname?: string;
  email?: string;
  is_verified?: boolean;
  role?: string;
  token?: string;
  created_at?: string;
}

export type { LoginDto, InLoginDto };
