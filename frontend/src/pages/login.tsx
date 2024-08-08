import { useForm, SubmitHandler } from "react-hook-form";
import { axiosConfig } from "../misc/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../stateManagement/contextApi/loginContext";
import { useEffect, useState } from "react";
import { toastify } from "../components/toastify";
import {
  AppleSVG,
  FacebookSVG,
  GoogleSVG,
  LoadingAnimation,
} from "../components/svg";
import { PageTitle } from "../misc/pageTitle";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import ResponsiveNavBar from "../components/responsiveNavBar";

type LoginFields = {
  email: string;
  password: string;
};
const loginUrl = `${import.meta.env.VITE_URL}${import.meta.env.VITE_LOGIN_ENDPOINT}`;

// component for the login page
export function LoginPage() {
  const signIn = useSignIn();
  PageTitle({ title: "Login" });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>();
  const { authStatus, setAuthStatus } = useAppContext();
  const [rememberMe, setRememberMe] = useState(false);

  function handleRememberMe() {
    setRememberMe(!rememberMe);
  }

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      const updatedData = { ...data, rememberMe };
      await axiosConfig
        .post(loginUrl, updatedData, {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        })
        .then((e) => {
          if (e.status === 200) {
            signIn({
              auth: {
                token: e.data.token,
                type: "Bearer",
              },
              userState: { email: data.email },
            });
            setAuthStatus(true);
            toastify({
              type: "success",
              text: "Login Successful..Redirecting to home page in 5 seconds",
            });
            setTimeout(() => {
              navigate("/home");
            }, 6000);
          }
        })
        .catch((err) => {
          setError("password", { message: "Invalid credentials" });
          setError("email", { message: "Invalid credentials" });
          console.error(err.message);
        });
    } catch (err: any) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    console.log("Current authStatus:", authStatus);
    localStorage.setItem("authStatus", JSON.stringify(authStatus));
  }, [authStatus]);

  return (
    <div className="w-[85%]  mr-auto ml-auto">
      <ResponsiveNavBar />
      <div className=" flex flex-col mt-20">
        <p className="xxs:text-3xl lg:text-5xl font-bold text-center tracking-wider">
          Unlock Your Luxury Profile
        </p>
        <p className="text-center mt-5 lg:text-xl italic">
          Sign in to Elevate Your Experience
        </p>
        <div className="flex xxs:flex-col xxs: gap-5 md:gap-0 md:flex-row mt-20 items-center lg:w-3/4 lg:mr-auto lg:ml-auto">
          <div className="flex lg:w-2/4  h-[300px] float-left items-center">
            <form
              className="mr-auto ml-auto flex flex-col lg:w-3/4 gap-5"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
            >
              <div className="">
                <input
                  {...register("email", {
                    required: "Please provide a valid email",
                  })}
                  type="email"
                  placeholder="email"
                  className="border-offBlue border-2 p-2 w-full"
                />{" "}
                {/* // Add a closing tag for the input element */}
                {errors.email && (
                  <div className="text-red-500 text-sm">
                    {errors.email.message}
                  </div>
                )}
              </div>

              <div>
                <input
                  {...register("password", {
                    minLength: {
                      value: 8,
                      message: "Password should be at least 8 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password should not be more than 20 characters",
                    },
                  })}
                  type="password"
                  placeholder="password"
                  className="border-2 border-offBlue p-2 w-full"
                ></input>
                {errors.password && (
                  <div className="text-red-500 text-sm">
                    {errors.password.message}
                  </div>
                )}
                <div className="mt-5">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                  ></input>
                  <label className="ml-2 select-none" htmlFor="rememberMe">
                    Keep me logged in
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="p-2 inline-block bg-[#417A9F] hover:bg-[#3B6F91] duration-500 transition-colors text-slate-50 w-full"
              >
                {isSubmitting ? <LoadingAnimation /> : "Login"}
              </button>
            </form>
          </div>
          <p className="italic mr-auto ml-auto">or</p>
          <div className="flex flex-col gap-5 w-3/4 justify-center xxs: mr-auto xxs:ml-auto md:w-[30%] self-end ml-auto mt-auto mb-auto lg:mr-10">
            <div className="p-2 text-black text-center rounded-md border-slate-50 border-2 shadow-md">
              <GoogleSVG />
              <span className="text-sm ml-3">Sign in with Google</span>
            </div>
            <div className="p-2 text-black text-center rounded-md shadow-md border-slate-50 border-2">
              <AppleSVG />
              <span className="text-sm ml-3">Sign in with Apple</span>
            </div>
            <div className="p-2 text-black text-center rounded-md shadow-md border-slate-50 border-2">
              <FacebookSVG />
              <span className="text-sm ml-3">Sign in with Facebook</span>
            </div>
          </div>
        </div>
        <p className="w-full text-center xxs:mt-5 lg:mt-0">
          New User?
          <a
            href="/register"
            className="text-gray-400 ml-2 hover:text-gray-800 transition-all duration-500"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
