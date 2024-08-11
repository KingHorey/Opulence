import { axiosConfig } from "../misc/axiosConfig";
import { LoadingAnimation } from "../components/svg";
import UploadWidget from "../misc/uploadWidget";
import { SubmitHandler, useForm } from "react-hook-form";
import { addNewProduct, getBrandData } from "../types";
import { useState, useEffect } from "react";

export function AddProduct() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<addNewProduct>();

  const uploadSuccess = (link: string) => {
    setImageLink(link);
  };

  const [imageLink, setImageLink] = useState<string>("");
  const [brands, setBrands] = useState<getBrandData[]>([]);

  useEffect(() => {
    const getBrands = async () => {
      try {
        let response = await axiosConfig.get(
          `${import.meta.env.VITE_URL}${import.meta.env.VITE_GET_BRAND_ENDPOINT}`
        );
        if (response.status === 200) {
          setBrands(response.data);
        } else {
          setError("brand", {
            message: "Error fetching brands, please refresh the page",
          });
        }
      } catch (err: any) {
        setError("brand", {
          message: "Error fetching brands, please refresh the page",
        });
      }
    };
    getBrands();
    // console.log(brands);
  }, []);

  const addProduct: SubmitHandler<addNewProduct> = async (data) => {
    console.log(data);
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
          <label htmlFor="brand"></label>
          <label htmlFor=""></label>
          <label htmlFor=""></label>
          <label htmlFor=""></label>
          <label htmlFor=""></label>
          <label htmlFor=""></label>
          <label htmlFor=""></label>
          <label htmlFor=""></label>
          <label htmlFor=""></label>
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
          <div className="text-red-500">{errors && errors.name?.message}</div>
        </div>
        <div className="bg-slate-50 w-[80%] mt-5 ml-auto mr-auto">
          <label htmlFor="Brand" className="text-lg">
            Select Brand<span className="text-red-500"> *</span>
          </label>
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
              <p className="text-lg" {...register("sizeVariants")}>
                Size Variants<span className="text-red-500">*</span>
              </p>
              <div className="flex gap-5">
                <label className="text-base">
                  <input type="checkbox" value="S" className="mr-2"></input>S
                </label>
                <label className="text-base">
                  <input type="checkbox" value="M" className="mr-2"></input>M
                </label>
                <label className="text-base">
                  <input type="checkbox" value="L" className="mr-2"></input>L
                </label>
                <label className="text-base">
                  <input type="checkbox" value="XL" className="mr-2"></input>XL
                </label>
                <label className="text-base">
                  <input type="checkbox" value="XXL" className="mr-2"></input>
                  XXL
                </label>
              </div>
              {/* {errors.sizeVariants && (
                <p className="text-red-500">{errors.sizeVariants.message}</p>
              )} */}
            </div>
            <div></div>
          </div>
        </div>
        <div className="bg-slate-50 w-[80%] mt-5 ml-auto mr-auto flex gap-5 justify-between">
          <div className="flex flex-col w-2/4">
            <label htmlFor="category" className="text-lg">
              Select category <span className="text-red-500">*</span>
            </label>
            <select
              className="bg-slate-50 border border-offBlue w-full p-1"
              {...register("category", {
                required: "Product needs to have a category",
              })}
            >
              <option value="Male">Shirts</option>
              <option value="Female">Trousers</option>
              <option value="Kids">Gowns</option>
              <option value="Unisexual">Accessories</option>
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-lg">
              Gender <span className="text-red-500">*</span>
            </label>
            <select className="bg-slate-50 border border-offBlue w-full p-1">
              <option value="male">Male</option>
              <option value="male">Female</option>
              <option value="Kids">Kids</option>
              <option value="Unisexual">Unisexual</option>
            </select>
          </div>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="featured" className="text-lg">
              Featured
              <input
                type="checkbox"
                value="featured"
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