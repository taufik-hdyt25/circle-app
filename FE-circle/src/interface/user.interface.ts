export interface IUser {
  createdAt: string;
  email: string;
  fullname: string;
  id: number;
  password: string;
  profile_description: string;
  profile_picture: string;
  username: string;
}

export interface IRegister {
  email: string;
  fullname: string;
  password: string;
}

export interface ILogin {
  emailOrUsername: string;
  password: string;
}

export interface IProfile {
  user: IUser;
  followings: [];
  followers: [];
  message: string;
}

export interface IFollow {
  fullname: string
  id: number
  profile_picture: string
  username: string
}

export interface IUpdateProfile{
  fullname: string
  username: string
  email: string
  profile_description: string
  profile_picture: string
}
