import axios from "axios";

export const axiosConfig = axios.create({
  withCredentials: true,
  timeout: 30000,
  baseURL: import.meta.env.VITE_URL,
});
