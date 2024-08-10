import UploadWidget from "../misc/uploadWidget";
import { useForm, SubmitHandler } from "react-hook-form";
import { addNewBrand } from "../types";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { axiosConfig } from "../misc/axiosConfig";
import { LoadingAnimation } from "../components/svg";
import { toastify } from "../components/toastify";

export function AddBrandPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<addNewBrand>();

  const [imageLink, setImageLink] = useState<string>("");

  const uploadSuccess = (link: string) => {
    setImageLink(link);
  };

  const addBrand: SubmitHandler<addNewBrand> = async (data) => {
    data = { ...data, image: imageLink };
    try {
      let result = await axiosConfig.post(
        `${import.meta.env.VITE_URL}${import.meta.env.VITE_ADD_BRAND_ENDPOINT}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthHeader()}`,
          },
        }
      );
      if (result.status === 200) {
        toastify({
          type: "success",
          text: "Image Upload Successful",
        });
      } else {
        toastify({
          type: "error",
          text: "Image Upload Failed",
        });
      }
    } catch (err) {
      toastify({
        type: "error",
        text: "Image Upload Failed",
      });
    }
  };
  return (
    <div className="p-2 mr-auto ml-auto">
      <form
        onSubmit={handleSubmit(addBrand)}
        className="w-full ml-auto mr-auto flex flex-col"
      >
        <p className="font-bold text-md raleway">
          Brand Name<span className="text-red-500">*</span>
        </p>
        <div className="bg-slate-50 w-[80%] mt-5 ml-3 ml-auto mr-auto">
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
            className="border-offBlue border bg-slate-50 w-full mt-5 ml-3 ml-auto mr-auto p-1"
            placeholder="e.g. Nike"
          ></input>
          <div className="text-red-500">{errors && errors.name?.message}</div>
        </div>
        <div className="bg-slate-50 w-[80%] mt-5 ml-3 ml-auto mr-auto">
          <textarea
            {...register("description", {
              required: "Brand Description is needed",
            })}
            className="border-offBlue border bg-slate-50 w-full mt-5 ml-3 ml-auto mr-auto p-1"
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
          <UploadWidget link={uploadSuccess} />
        )}
        <div className=" w-[80%] mt-5 ml-3 ml-auto mr-auto p-1">
          <button className="bg-blue-400 hover:bg-deepBlue text-slate-50 duration-500 transition-colors p-1 lg:w-[120px] mt-3 rounded-sm">
            {" "}
            {isSubmitting ? <LoadingAnimation /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
