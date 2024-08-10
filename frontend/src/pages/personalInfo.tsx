import ProfileHeaders from "../misc/profileHeaders";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { axiosConfig } from "../misc/axiosConfig";
import { UserDataFromDB, UserProfileUpdate } from "../types";
import { Navigate } from "react-router-dom";
import {
  FormContainer,
  ProfileSubCategories,
  ProfileSubHeadersCategory,
} from "../components/headers";
import "react-loading-skeleton/dist/skeleton.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { getEmailAvailability, updateUser } from "../misc/externalCalls";
import { LoadingAnimation } from "../components/svg";
import { toastify } from "../components/toastify";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { ToastContainer } from "react-toastify";
import { ResponseData } from "../types";

export default function PersonalInfo() {
  const {
    register,
    clearErrors,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UserProfileUpdate>();
  const authHeader = useAuthHeader();
  const authUser: { email: string } | null = useAuthUser();
  let userDetails = authUser?.email;
  const [userData, setUserData] = useState<
    UserDataFromDB | ResponseData["user"]
  >();
  const [error, setErrors] = useState<null | string>(null);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [emailAvailability, setEmailAvailability] = useState<boolean>(false);
  const [currentMail, setCurrentMail] = useState<string>("");
  const signIn = useSignIn();

  const checkMail: SubmitHandler<UserProfileUpdate> = (data) => {
    if (data.email !== currentMail) {
      getEmailAvailability(data.email).then((res) => {
        if (res === true) {
          clearErrors("email");
          setCurrentMail(data.email);
          setEmailAvailability(true);
        } else {
          setEmailAvailability(false);
        }
      });
    } else {
      const verifiedStatus = userData?.emailVerified;
      setError("email", {
        type: "manual",
        message: verifiedStatus
          ? "Email has been verified"
          : "Email is yet to be verified",
      });
    }
  };

  const onSubmit: SubmitHandler<UserProfileUpdate> = (data) => {
    data = {
      ...data,
      email: currentMail,
      userMail: userData?.email,
      headers: authHeader?.split(" ")[1],
    };
    updateUser(data)
      .then((res) => {
        if (res) {
          const { token, user } = res;
          const email = user?.email;
          if (email && token) {
            signIn({
              auth: {
                token: token,
                type: "Bearer",
              },
              userState: {
                email: email,
              },
            });
          }
          setUserData(res.user);
          toastify({ type: "success", text: "Profile Updated Successfully" });
          <ToastContainer />;
        } else {
          toastify({ type: "error", text: "Error Updating Profile" });
          <ToastContainer />;
        }
      })
      .catch((err) => {
        toastify({ type: "error", text: `${err.message}` });
        <ToastContainer />;
      });
  };

  useEffect(() => {
    axiosConfig
      .get(
        `${import.meta.env.VITE_URL}${import.meta.env.VITE_PERSONAL_INFORMATION}`,
        {
          headers: {
            Authorization: authHeader,
          },
          params: {
            userDetails,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setCurrentMail(response.data.email);
          setUserData(response.data);
        } else if (response.status === 401) {
          <Navigate to="/login" />;
        } else {
          setErrors("Error Fetching data");
        }
      })
      .catch(() => {
        setErrors("Unable to fetch data, please refresh the page");
      })
      .finally(() => {
        setLoadingState(false);
      });
  }, [userData]);

  return (
    <div>
      <ProfileHeaders text={"Personal Information"} />
      <div className="ml-5 mt-5 mr-5">
        <p className="w-fit">
          {loadingState ? (
            <Skeleton count={1} height={10} width={300} />
          ) : (
            <>
              Filled during registration, fields marked
              <span className="text-red-500"> *</span> are not editable
            </>
          )}
        </p>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <ProfileSubCategories>
              <FormContainer>
                <div className="w-2/4">
                  {loadingState ? (
                    <Skeleton count={1} height={10} />
                  ) : (
                    <p className="font-bold">
                      First Name <span className="text-red-500">*</span>
                    </p>
                  )}
                  {loadingState ? (
                    <Skeleton count={1} height={30} />
                  ) : (
                    <input
                      type="text"
                      defaultValue={userData?.f_name}
                      className="border-offBlue p-1 bg-transparent border rounded-md w-full active:border-offBlue focus:border-offBlue focus:outline focus:outline-offBlue"
                      readOnly
                    />
                  )}
                </div>
                <div className="w-2/4">
                  {loadingState ? (
                    <Skeleton count={1} height={10} />
                  ) : (
                    <p className="font-bold">
                      Last Name <span className="text-red-500">*</span>
                    </p>
                  )}
                  {loadingState ? (
                    <Skeleton count={1} height={30} />
                  ) : (
                    <input
                      type="text"
                      defaultValue={userData?.l_name}
                      className="border-offBlue p-1 bg-transparent1 border rounded-md w-full active:border-offBlue focus:border-offBlue focus:outline focus:outline-offBlue select-none"
                      readOnly
                    />
                  )}
                </div>
              </FormContainer>
            </ProfileSubCategories>
            <ProfileSubCategories>
              <form
                id="contactForm"
                className="h-0 hidden"
                onSubmit={handleSubmit(onSubmit)}
              ></form>
              <form
                onSubmit={handleSubmit(checkMail)}
                method="post"
                id="mailAvailability"
                className="h-0 hidden"
              ></form>
              <ProfileSubHeadersCategory text="Contact Information" />

              <div>
                <div className="flex gap-5">
                  <div className="w-2/4">
                    {loadingState ? (
                      <Skeleton count={1} height={10} />
                    ) : (
                      <p className="font-bold">Telephone (Home)</p>
                    )}
                    {loadingState ? (
                      <Skeleton count={1} height={10} />
                    ) : (
                      <input
                        {...register("telephoneHome", {
                          required: false,
                          pattern: {
                            value: /^[0]*[0-9]{10}$/,
                            message: "Invalid Phone Number",
                          },
                        })}
                        type="tel"
                        placeholder="080-xxx-xxx-xx"
                        className="border-offBlue p-1 bg-transparent1 border rounded-md w-full active:border-offBlue focus:border-offBlue focus:outline focus:outline-offBlue"
                        form="contactForm"
                        defaultValue={
                          userData?.telephoneHome ? userData.telephoneHome : ""
                        }
                        minLength={10}
                        maxLength={11}
                      ></input>
                    )}
                    {errors.telephoneHome && (
                      <p className="text-red-500">
                        {errors.telephoneHome.message}
                      </p>
                    )}
                  </div>
                  <div className="w-2/4">
                    {loadingState ? (
                      <Skeleton count={1} height={10} />
                    ) : (
                      <p className="font-bold">Telephone (Personal)</p>
                    )}
                    {loadingState ? (
                      <Skeleton count={1} height={30} />
                    ) : (
                      <input
                        {...register("telephonePersonal", {
                          required: false,
                          pattern: {
                            value: /^[0]*[0-9]{10}$/,
                            message: "Invalid Phone Number",
                          },
                        })}
                        type="tel"
                        placeholder="080-xxx-xxx-xx"
                        className="border-offBlue p-1 bg-transparent1 border rounded-md w-full active:border-offBlue focus:border-offBlue focus:outline focus:outline-offBlue"
                        form="contactForm"
                        minLength={10}
                        maxLength={11}
                        defaultValue={
                          userData?.telephonePersonal
                            ? userData.telephonePersonal
                            : ""
                        }
                      ></input>
                    )}
                    {errors.telephonePersonal && (
                      <p className="text-red-500">
                        {errors.telephonePersonal.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="xxs:w-full lg:w-4/5 mt-5">
                  {loadingState ? (
                    <Skeleton count={1} height={10} />
                  ) : (
                    <p className="font-bold">Email Address</p>
                  )}
                  {loadingState ? (
                    <Skeleton height={30} />
                  ) : (
                    <div>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          validate: (mail) =>
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(
                              mail
                            ) || "Invalid Email",
                        })}
                        type="email"
                        defaultValue={userData?.email}
                        className="border-offBlue p-1 bg-transparent border rounded-md xxs:2/6 lg:w-3/5 active:border-offBlue focus:border-offBlue focus:outline focus:outline-offBlue"
                        onChange={() => setEmailAvailability(false)}
                      ></input>
                      <button
                        className="xxs: ml-1 lg:ml-5 bg-offBlue p-1 rounded-md hover:bg-blue-300 transition-all duration-500 border-offBlue border"
                        disabled={isSubmitting}
                        form="mailAvailability"
                      >
                        {isSubmitting ? (
                          <LoadingAnimation />
                        ) : (
                          "Confirm Availability"
                        )}
                      </button>

                      <span>
                        {errors.email ? (
                          <p className="text-red-500">{errors.email.message}</p>
                        ) : emailAvailability ? (
                          <p className="text-green-500">Email is available</p>
                        ) : userData?.emailVerified ? (
                          <p className="text-green-300">
                            Email has been verified
                          </p>
                        ) : (
                          <p className="text-red-400">
                            Email is yet to be verified
                          </p>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-10">
                <hr></hr>
                <button
                  className="mt-5 bg-blue-300 hover:bg-blue-500 transition-all duration-300 p-1 rounded-md text-slate-50 xxs:w-2/6 lg:w-1/12 mb-10"
                  form="contactForm"
                >
                  Save
                </button>
              </div>
            </ProfileSubCategories>
          </div>
        )}
      </div>
    </div>
  );
}
