import { axiosConfig } from "./axiosConfig";
import {
  filterCategories,
  getBrandData,
  UserProfileUpdate,
  productsData,
} from "../types";
import { ResponseData } from "../types";

export function getEmailAvailability(email: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    axiosConfig
      .post(
        `${import.meta.env.VITE_URL}${import.meta.env.VITE_MAIL_VERIFICATION_ENDPOINT}`,
        JSON.stringify({ email: email }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200 && response.data.available) {
          resolve(true);
        } else if (response.status === 200 && !response.data.available) {
          resolve(false);
        }
      })
      .catch(() => {
        reject(false);
      });
  });
}

export function updateUser(data: UserProfileUpdate): Promise<ResponseData> {
  return new Promise((resolve, reject) => {
    const newData = { ...data };
    const { email, telephoneHome, telephonePersonal, userMail } = data;
    axiosConfig
      .put(
        `${import.meta.env.VITE_URL}${import.meta.env.VITE_UPDATE_PERSONAL_INFORMATION}`,
        JSON.stringify({ email, telephoneHome, telephonePersonal, userMail }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newData.headers}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data);
        }
      })
      .catch(() => {
        reject(false);
      });
  });
}

export async function fetchBrands(): Promise<getBrandData[] | null> {
  try {
    let response = await axiosConfig.get(
      `${import.meta.env.VITE_URL}${import.meta.env.VITE_GET_BRAND_ENDPOINT}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (err: any) {
    return null;
  }
}

export async function fetchCategories(): Promise<filterCategories[] | null> {
  try {
    let response = await axiosConfig.get(
      `${import.meta.env.VITE_URL}${import.meta.env.VITE_GET_CATEGORIES_ENDPOINT}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (err: any) {
    return null;
  }
}

export async function fetchProducts(): Promise<productsData[] | null> {
  try {
    const response = await axiosConfig.get(
      `${import.meta.env.VITE_URL}/api/products/new-arrivals`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return [response.data.data, response.data.total];
    } else {
      return null;
    }
  } catch (err: any) {
    return null;
  }
}

export async function getProductInfo(
  id: string
): Promise<productsData[] | null> {
  try {
    let response = await axiosConfig.get(
      `${import.meta.env.VITE_URL}/api/products/${id}`
    );
    if (response.status === 200) {
      // console.log(response.data);
      return response.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}
