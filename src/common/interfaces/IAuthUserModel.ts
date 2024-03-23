import { IUser } from './IUser';

export interface IAuthUserModel {
  user: IUser;
  access_token: string;
  token_type: string;
  expires_in: number;
}
