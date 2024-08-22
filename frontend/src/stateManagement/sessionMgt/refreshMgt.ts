import createRefresh from "react-auth-kit/createRefresh";
import { ParamInterface } from "../../types";
import { axiosConfig } from "../../misc/axiosConfig";

export const refreshApi = createRefresh<ParamInterface>({
  interval: 3600,
  refreshApiCallback: async (param): Promise<ParamInterface> => {
    try {
      const response = await axiosConfig.post(
        `${import.meta.env.VITE_REFRESH_TOKEN}`,
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
