import { IAuthUserModel } from 'common/interfaces/IAuthUserModel';
import { IUser } from 'common/interfaces/IUser';

export class AuthUserModel implements IAuthUserModel {
  user: IUser = {
    id: 0,
    name: '',
    photo: '',
    email: '',
    phone: '',
    status: false,
    role: '',
  };
  access_token: string = '';
  token_type: string = '';
  expires_in: number = 0;
}
