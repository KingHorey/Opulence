import axios from "axios";

export const axiosConfig = axios.create({
  withCredentials: true,
  timeout: 10000,
});
