import { FieldValues } from 'react-hook-form';

export type UserName = {
  firstName: string;
  lastName: string;
};

export interface IUser {
  _id?: string;
  name: UserName;
  role?: 'user' | 'admin' | 'subAdmin';
  status?: 'active' | 'inactive' | 'block';
  password: string;
  gender?: 'male' | 'female';
  email: string;
  phoneNumber?: string;
  address?: string;
  imageURL?: string;
}

export interface ILogin {
  password: string;
  email: string;
}

export interface IUserFrom extends FieldValues {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  address?: string;
  NewPass: string;
}

export interface IResponseData {
  response: {
    data: object;
    message: string;
    statusCode: number;
    success: boolean;
  };
}
