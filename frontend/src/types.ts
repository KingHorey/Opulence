export interface ItemInterface {
  name: string;
  quantity: number;
  id: string;
  image: string;
}

export interface cartProduct {
  cartID: string;
  name: string;
  image: string;
  category: string;
  amount: number;
  price: number;
  size: string;
}

export interface CartInterface {
  cartProduct: cartProduct;
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

export interface BookarksData {
  user: string;
  products: string[];
}
export interface productsData {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: filterCategories;
  description: string;
  brand: addNewBrand;
  sizeVariants: string[];
  colorVariants: string[];
  linkName: string;
  bookmarks?: BookarksData;
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

export interface addNewProduct {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  description: number;
  image: string;
  sizeVariants: string[];
  colorVariants: string[];
  category: string;
  featured: boolean;
  gender: string;
}

export interface getBrandData {
  [key: string]: string;
}

export interface categoriesData {
  [key: string]: string;
}

export interface filtering {
  category: string[];
  brand: string[];
  price: string;
  size: string[];
  color: string[];
}

export interface searchItems {
  search: string;
}
