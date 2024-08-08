import createRefresh from "react-auth-kit/createRefresh";
import axios from "axios";
import { ParamInterface } from "../../types";

export const refreshApi = createRefresh<ParamInterface>({
  interval: 3600,
  refreshApiCallback: async (param): Promise<ParamInterface> => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}${import.meta.env.VITE_REFRESH_TOKEN}`,
        param,
        {
          headers: { Authorization: `Bearer ${param.authToken}` },
        }
      );
      return {
        isSuccess: true,
        newAuthToken: response.data.token as string,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        newAuthToken: "",
        newAuthTokenExpireIn: 0,
        newRefreshTokenExpiresIn: 0,
      };
    }
  },
});
