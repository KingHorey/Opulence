import UploadWidget from "../misc/uploadWidget";
import { useForm, SubmitHandler } from "react-hook-form";
import { addNewBrand } from "../types";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { LoadingAnimation } from "../components/svg";
import { toastify } from "../components/toastify";
import axios from "axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export function AddBrandPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<addNewBrand>();

  const authHeader = useAuthHeader();
  const authUser: { email: string } | null = useAuthUser();
  let userDetails = authUser?.email;
  const [imageLink, setImageLink] = useState<string>("");

  const uploadSuccess = (link: string) => {
    setImageLink(link);
  };

  const addBrand: SubmitHandler<addNewBrand> = async (data) => {
    data = { ...data, image: imageLink };
    try {
      let result = await axios.post(
        `${import.meta.env.VITE_URL}${import.meta.env.VITE_ADD_BRAND_ENDPOINT}`,
        JSON.stringify({ data, userDetails }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );
      if (result.status === 201) {
        toastify({
          type: "success",
          text: "Image Upload Successful",
        });
        window.location.reload();
      }
    } catch (err: any) {
      if (err.response.status === 409) {
        toastify({
          type: "error",
          text: err.response.data,
        });
      } else {
        toastify({
          type: "error",
          text: err.response.data,
        });
      }
    }
  };
  return (
    <div className="p-2 mr-auto ml-auto">
      <form
        onSubmit={handleSubmit(addBrand)}
        className="w-full ml-auto mr-auto flex flex-col"
        method="post"
      >
        <p className="font-bold text-md raleway">
          Brand Name<span className="text-red-500">*</span>
        </p>
        <div className="bg-slate-50 w-[80%] mt-5 ml-auto mr-auto">
          <input
            {...register("name", {
              required: "The name of the brand is required",
              minLength: {
                value: 3,
                message:
                  "The name of the brand should be at least 3 characters",
              },
            })}
            type="Text"
            className="border-offBlue border bg-slate-50 w-full mt-5  ml-auto mr-auto p-1"
            placeholder="e.g. Nike"
          ></input>
          <div className="text-red-500">{errors && errors.name?.message}</div>
        </div>
        <div className="bg-slate-50 w-[80%] mt-5 ml-auto mr-auto">
          <textarea
            {...register("description", {
              required: "Brand Description is needed",
            })}
            className="border-offBlue border bg-slate-50 w-full mt-5 ml-auto mr-auto p-1"
            placeholder="Brand Description"
          ></textarea>
          <div className="text-red-500">{errors && errors.name?.message}</div>
        </div>
        {imageLink ? (
          <div className="w-[80%] mr-auto ml-auto mt-3 h-[200px]">
            <img
              src={imageLink}
              alt="uploaded image"
              className="w-full h-full object-cover"
              {...(register("image"),
              {
                required: "Image is needed",
              })}
            ></img>
          </div>
        ) : (
          <UploadWidget link={uploadSuccess} text="Upload Brand Image" />
        )}
        <div className=" w-[80%] mt-5 ml-auto mr-auto p-1">
          <button className="bg-blue-400 hover:bg-deepBlue text-slate-50 duration-500 transition-colors p-1 lg:w-[120px] mt-3 rounded-sm">
            {isSubmitting ? <LoadingAnimation /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
