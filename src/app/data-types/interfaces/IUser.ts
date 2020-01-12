export interface IUserRegister {
  email: string;
  username: string;
  password: string;
}

export class IUserProfile {
  firstName: string;
  lastName: string;
  gender: number;
  location: string;
  website: string;
  picture: string;
}
export class IUser {
  firstName?: string;
  lastName?: string;
  gender?: number;
  location?: string;
  website?: string;
  picture?: string;
  roleName?: string;
  username?: string;
  email: string;
}
