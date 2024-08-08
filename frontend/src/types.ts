export interface ItemInterface {
  name: string;
  quantity: number;
  id: string;
  image: string;
}

export interface RootState {
  cart: ItemInterface[];
}

export interface UserDataFromDB {
  f_name: string;
  l_name: string;
  email: string;
  emailVerified: boolean;
  telephoneHome?: number;
  telephonePersonal?: number;
}

export interface ParamInterface {
  isSuccess: boolean;
  newAuthToken: string;
  newAuthTokenExpireIn: number;
  newRefreshTokenExpiresIn: number;
}

export interface UserProfileUpdate {
  email: string;
  telephoneHome?: number;
  telephonePersonal?: number;
  userMail: string | undefined;
  headers?: string;
}

export interface ResponseData {
  message: string;
  user?: {
    telephoneHome?: number;
    telephonePersonal?: number;
    email: string;
    emailVerified: boolean;
    f_name: string;
    l_name: string;
  };
  token?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  summary: string;
  message: string;
}
