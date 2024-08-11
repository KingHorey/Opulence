import { NavBar, SmallNavBar } from "../components/navBar";
import { toastify } from "../components/toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AppleSVG,
  FacebookSVG,
  GoogleSVG,
  LoadingAnimation,
} from "../components/svg";

interface RegisterFields {
  f_name: string;
  l_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>();
  const navigate = useNavigate();

  const [validMail, checkValidMail] = useState(false);
  const [initialState, setMailState] = useState(true);

  function styles() {
    if (validMail && initialState) {
      return "border-green-500";
    }
    if (initialState || validMail) {
      return "border-offBlue";
    }
    return "border-red-500";
  }

  function verifyEmail(email: string) {
    const jsonMail = JSON.stringify({ email });
    axios
      .post(
        `${import.meta.env.VITE_URL}${import.meta.env.VITE_MAIL_VERIFICATION_ENDPOINT}`,
        jsonMail,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response: any) => {
        if (response.status === 200) {
          if (response.data.available === true) {
            clearErrors("email");
            checkValidMail(true);
            setMailState(true);
          } else {
            setError("email", { message: "Email already in use" });
            checkValidMail(false);
            setMailState(false);
          }
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  const onSubmit: SubmitHandler<RegisterFields> = (data: RegisterFields) => {
    if (!validMail) {
      return;
    }
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${import.meta.env.VITE_URL}${import.meta.env.VITE_REGISTER_ENDPOINT}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            toastify({
              type: "success",
              text: "Registration Successful.. Proceed to Login",
            });
            setTimeout(() => {
              resolve("Registration successful");
              navigate("/login");
            }, 5000);
          } else {
            resolve("Registration failed");
            toastify({
              type: "error",
              text: "Registration Unsuccessful, please retry",
            });
            setError("root", { message: "Registration failed" });
          }
        })
        .catch(() => {
          toastify({
            type: "error",
            text: "Registration Unsuccessful, please retry",
          });
          reject("Registration failed");
          setError("root", { message: "Registration failed" });
        });
    });
  };

  return (
    <div className="w-[85%]  mr-auto ml-auto">
      <div className="xxs:hidden md:block">
        <NavBar />
      </div>
      <div className="md:hidden">
        <SmallNavBar />
      </div>
      <div className=" flex flex-col mt-20">
        <p className="text-5xl font-bold text-center tracking-wider">
          Join Our Elite Membership
        </p>
        <p className="text-center mt-5 lg:text-xl italic">
          Create an Account for Exclusive Perks, Discounts and Offers
        </p>
      </div>
      <div className="flex xxs:flex-col xxs: gap-5 md:gap-0 lg:flex-row mt-20 items-center lg:w-3/4 lg:mr-auto lg:ml-auto">
        <div className="flex lg:w-2/4  h-[300px] float-left items-center">
          <form
            className="mr-auto ml-auto flex flex-col lg:w-full gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="xxs:flex xxs:flex-col  md:flex md:flex-row md:justify-between">
              <div className="xxs:w-full md:w-3/4 mr-3">
                <input
                  {...register("f_name", {
                    required: "First Name is required",
                  })}
                  type="text"
                  id="f_name"
                  name="f_name"
                  placeholder="First Name"
                  className="border-offBlue border p-2 w-full"
                />
                {errors.f_name && (
                  <div className="text-red-500 text-sm">
                    {errors.f_name.message}
                  </div>
                )}
              </div>
              <div className="xxs:mt-5 md:mt-0 xxs:w-full md:w-3/4  ml-auto  self-end">
                <input
                  {...register("l_name", {
                    required: "Last Name is required",
                  })}
                  type="text"
                  name="l_name"
                  id="l_name"
                  placeholder="Last Name"
                  className="border-offBlue border p-2 w-full"
                />
                {errors.l_name && (
                  <div className="text-red-500 text-sm">
                    {errors.l_name.message}
                  </div>
                )}
              </div>
            </div>
            <div>
              <input
                {...register("email", {
                  required: "Email needs to be provided",
                  validate: (mail) =>
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                      mail
                    ) || "Email is invalid",
                })}
                onBlur={(e) => verifyEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                className={`${styles()} border p-2 self-end w-full`}
              />
              {errors.email && (
                <div className="text-red-500 text-sm">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <div className="w-3/4 mr-3">
                <input
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)(?=.*[!@#"/.&^]+)[a-zA-Z0-9!@#"/.&^]{8,}$/,
                      message:
                        "Password must contain at least 8 characters, one letter and one number",
                    },
                  })}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="border-offBlue border p-2 w-full"
                />
                {errors.password ? (
                  <div className="text-red-500 text-sm">
                    {errors.password.message}
                  </div>
                ) : (
                  <p className="text-sm">
                    Password must contain at least 8 characters, one letter and
                    one number
                  </p>
                )}
              </div>
              <div className="w-3/4">
                <input
                  {...register("confirmPassword", {
                    required: "Password is required",
                    validate: (data) =>
                      watch("password") === data || "Passwords do not match",
                  })}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="border-offBlue border p-2 w-full"
                />
                {errors.confirmPassword ? (
                  <div className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </div>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-slate-400 p-2 text-slate-50 hover:bg-slate-500 duration-200 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingAnimation /> : "Register"}
            </button>
          </form>
        </div>
        <p className="italic mr-auto ml-auto">or</p>
        <div className="flex flex-col gap-5 w-3/4 justify-center xxs: mr-auto xxs:ml-auto lg:w-[30%] self-end ml-auto mt-auto mb-auto lg:mr-10">
          <div className="p-2 text-black text-center rounded-md shadow-md border-slate-50 border-2">
            <GoogleSVG />
            <span className="text-sm ml-3">Register with Google</span>
          </div>
          <div className="p-2 text-black text-center rounded-md  shadow-md border-slate-50 border-2">
            <AppleSVG />
            <span className="text-sm ml-3">Register with Apple</span>
          </div>
          <div className="p-2 text-black text-center rounded-md shadow-md border-slate-50 border-2 ">
            <FacebookSVG />
            <span className="text-sm ml-3">Register with Facebook</span>
          </div>
        </div>
      </div>
      <p className="text-center">
        Already a user?
        <a href="/login" className="text-gray-500 ml-3">
          Login
        </a>
      </p>
    </div>
  );
}
