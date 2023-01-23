export type UserType = {
  name: string;
  email: string;
  avatarPath: string;
  password: string;
  status: string;
}

export type SafeUserType = {
  name: string;
  email: string;
  avatarPath: string;
  status: string
}

export type ExtendedUserType = {
  name: string;
  email: string;
  avatarPath: string;
  password: string;
  status: string;
  favorites: string[];
}
