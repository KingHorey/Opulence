import { SucessSVG } from "../components/svg";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../stateManagement/contextApi/loginContext";

interface CustomJwtPayload extends JwtPayload {
  email: string;
  isAdmin: boolean;
}

export function OAuthSuccess() {
  const signin = useSignIn();
  const navigate = useNavigate();
  const { setAdminStatus, setAuthStatus } = useAppContext();

  let params = new URLSearchParams(window.location.search);
  let token = params.get("tokens");
  if (token) {
    const decodeJwt = jwtDecode<CustomJwtPayload>(params.toString());
    signin({
      auth: {
        token: token,
        type: "Bearer",
      },
      userState: { email: decodeJwt?.email, isAdmin: decodeJwt.isAdmin },
    });
    setAuthStatus(true);
    setAdminStatus(decodeJwt.isAdmin);
    setTimeout(() => {
      navigate("/home");
    }, 3000);
  } else {
    navigate("/login");
  }

  return (
    <div className="h-screen w-screen items-center justify-center">
      <div className="h-full w-full flex flex-col items-center justify-center gap-5">
        <SucessSVG />
        <p className="textxl lg:text-3xl font-semibold raleway">
          Successfully authenticated
        </p>
      </div>
    </div>
  );
}
