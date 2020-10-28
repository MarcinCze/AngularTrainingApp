import { IUser } from './iuser';

export class User implements IUser {
  id: number;
  firstName: string;
  lastName: string;
}
