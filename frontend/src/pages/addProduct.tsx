import { axiosConfig } from "../misc/axiosConfig";
import { SubmitHandler, useForm } from "react-hook-form";
import { addNewProduct, categoriesData, getBrandData } from "../types";
import { useState, useEffect } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { LoadingAnimation, RefreshIcon } from "../components/svg";
import UploadWidget from "../misc/uploadWidget";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { fetchBrands, fetchCategories } from "../misc/externalCalls";
import { toastify } from "../components/toastify";

export function AddProduct() {
  const authHeader = useAuthHeader();
  const authUser: { email: string } | null = useAuthUser();
  let userDetails = authUser?.email;
  const {
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<addNewProduct>({
    defaultValues: {
      sizeVariants: [],
      colorVariants: [],
      featured: false,
    },
  });

  // const sizeVariants = watch("sizeVariants");
  const uploadSuccess = (link: string) => {
    setImageLink(link);
  };

  const [imageLink, setImageLink] = useState<string>("");
  const [brands, setBrands] = useState<getBrandData[]>([]);
  const [categories, setCategories] = useState<categoriesData[]>([]);

  let getBrands = async () => {
    clearErrors("brand");
    try {
      let response = await fetchBrands();
      response && setBrands(response);
    } catch (err) {
      setError("brand", {
        message: "Unable to fetch data, please hit the refresh button",
      });
    }
  };
  let getCategories = async () => {
    clearErrors("category");
    try {
      let response = await fetchCategories();
      if (response) {
        setCategories(response);
      } else {
        setError("category", {
          message: "Unable to fetch data, please hit the refresh button",
        });
      }
    } catch (err) {
      setError("category", {
        message: "Unable to fetch data, please hit the refresh button",
      });
    }
  };

  useEffect(() => {
    getBrands();
    getCategories();
  }, []);

  const addProduct: SubmitHandler<addNewProduct> = async (data) => {
    data = { ...data, image: imageLink };
    try {
      console.log("sending");
      let result = await axiosConfig.post(
        "http://localhost:3000/api/products/add-product",
        JSON.stringify({ data, userDetails }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );
      if (result.status === 201) {
        toastify({ type: "success", text: "Product successfully added" });
        reset();
      } else if (result.status === 200) {
        toastify({ type: "success", text: "Product successfully updated" });
        reset();
      }
    } catch (err: any) {
      toastify({ type: "error", text: "Failed to add product" });
      console.error(err.message);
    }
  };

  return (
    <div className="p-2 mr-auto ml-auto">
      <form
        onSubmit={handleSubmit(addProduct)}
        className="w-full ml-auto mr-auto flex flex-col"
        method="post"
      >
        <p className="font-bold text-md raleway">
          Brand Name<span className="text-red-500">*</span>
        </p>
        <div className="bg-slate-50 w-[80%] mt-5 ml-auto mr-auto">
          <label htmlFor="productName" className="text-lg">
            Product Name<span className="text-red-500"> *</span>
          </label>
          <div className="flex items-center">
            <input
              {...register("name", {
                required: "The name of the product is required",
                minLength: {
                  value: 3,
                  message:
                    "The name of the Product should be at least 3 characters",
                },
              })}
              type="Text"
              className="border-offBlue border bg-slate-50 w-full mt-2  ml-auto mr-auto p-1"
              placeholder="e.g.  Men's Long Sleeve Cotton Jersey T-Shirt "
              id="productName"
            ></input>
          </div>
          <div className="text-red-500">{errors && errors.name?.message}</div>
        </div>
        <div className="bg-slate-50 w-[80%] mt-5 ml-auto mr-auto">
          <label htmlFor="Brand" className="text-lg">
            Select Brand<span className="text-red-500"> *</span>
          </label>
          <div className="flex items-center">
            <select
              {...register("brand", {
                required: "Brand is required",
              })}
              className="border-offBlue border bg-slate-50 w-full mt-2  ml-auto mr-auto p-1"
              id="brand"
            >
              <option value="">Select Brand</option>
              {brands &&
                brands.map((brand: any) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
            </select>
            <RefreshIcon onClick={getBrands} />
          </div>
          <div className="text-red-500">{errors && errors.brand?.message}</div>
        </div>
        <div className="flex bg-slate-50 w-[80%] mt-5 ml-auto mr-auto justify-between">
          <div className="flex flex-col">
            <label className="text-lg">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              {...register("quantity", {
                required: "Quantity of product is needed",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Quantity should be a number",
                },
              })}
              type="text"
              className="border-offBlue border bg-slate-50 w-full mt-1  ml-auto mr-auto p-1"
            ></input>
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="text-lg">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              {...register("price", {
                required: "Price is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Price should be a number",
                },
              })}
              type="text"
              className="border-offBlue border bg-slate-50 w-full mt-1  ml-auto mr-auto p-1"
            ></input>
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
        </div>
        <div className="bg-slate-50 w-[80%] mt-5 ml-auto mr-auto">
          <label htmlFor="description" className="text-lg">
            Product Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description", {
              required: "Product description is needed",
            })}
            className="border-offBlue border bg-slate-50 w-full mt-5 ml-auto mr-auto p-1"
            placeholder="Brand Description"
          ></textarea>
          <div className="text-red-500">
            {errors && errors.description?.message}
          </div>

          <div className="flex gap-5 mt-5">
            <div>
              <label htmlFor="colorVariants" className="text-lg">
                Color Variants<span className="text-red-500">*</span>
              </label>
              <input
                {...register("colorVariants", {
                  required: "Color variants of the product is required",
                })}
                type="text"
                id="colorVariants"
                className="border-offBlue border bg-slate-50 w-full mt-5 ml-auto mr-auto p-1"
                placeholder="black yellow red"
              ></input>
              {errors.colorVariants && (
                <p className="text-red-500">{errors.colorVariants.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <p className="text-lg">
                Size Variants<span className="text-red-500">*</span>
              </p>
              <div className="flex gap-5">
                <label className="text-base">
                  <input
                    {...register("sizeVariants")}
                    type="checkbox"
                    value="S"
                    className="mr-2"
                  ></input>
                  S
                </label>
                <label className="text-base">
                  <input
                    {...register("sizeVariants")}
                    type="checkbox"
                    value="M"
                    className="mr-2"
                  ></input>
                  M
                </label>
                <label className="text-base">
                  <input
                    {...register("sizeVariants")}
                    type="checkbox"
                    value="L"
                    className="mr-2"
                  ></input>
                  L
                </label>
                <label className="text-base">
                  <input
                    {...register("sizeVariants")}
                    type="checkbox"
                    value="XL"
                    className="mr-2"
                  ></input>
                  XL
                </label>
                <label className="text-base">
                  <input
                    {...register("sizeVariants")}
                    type="checkbox"
                    value="XXL"
                    className="mr-2"
                  ></input>
                  XXL
                </label>
              </div>
              {/* {errors.sizeVariants && (
                <p className="text-red-500">{errors.sizeVariants.message}</p>
              )} */}
            </div>
          </div>
        </div>
        <div className="bg-slate-50 w-[80%] mt-5 ml-auto mr-auto flex gap-5 justify-between">
          <div className="flex flex-col w-2/4">
            <label htmlFor="category" className="text-lg">
              Select category <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <select
                className="bg-slate-50 border border-offBlue w-full p-1"
                {...register("category", {
                  required: "Product needs to have a category",
                })}
              >
                {categories &&
                  categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.type}
                    </option>
                  ))}
              </select>
              <RefreshIcon onClick={getCategories} />
            </div>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-lg">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              {...register("gender")}
              className="bg-slate-50 border border-offBlue w-full p-1"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="Unisexual">Unisexual</option>
            </select>
          </div>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="featured" className="text-lg">
              Featured
              <input
                {...register("featured")}
                type="checkbox"
                value="true"
                className="ml-4 mr-2"
              ></input>
            </label>
          </div>
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
          <UploadWidget link={uploadSuccess} text="Upload Product Image" />
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
// Remove the closing curly brace
