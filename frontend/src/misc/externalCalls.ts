import { axiosConfig } from "./axiosConfig";
import { UserProfileUpdate } from "../types";
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
