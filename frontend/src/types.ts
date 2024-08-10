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

export interface filterCategories {
  _id: string;
  type: string;
}

export interface productsData {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface profileOrders {
  user: string;
  product: [Record<string, string | number>?];
  name: string;
  price: number;
  status: string;
  quantity: number;
  total: number;
}

export interface addNewBrand {
  name: string;
  image: string;
  description: string;
}
