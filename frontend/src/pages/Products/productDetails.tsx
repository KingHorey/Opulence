import { Footer } from "../../components/footer";
import { PageContainer } from "../../components/pageContainer";
import ResponsiveNavBar from "../../components/responsiveNavBar";
import { LoadingAnimation, WhiteCartIcon } from "../../components/svg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductInfo } from "../../misc/externalCalls";
import { productsData } from "../../types";
import { axiosConfig } from "../../misc/axiosConfig";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { toastify } from "../../components/toastify";

export function ProductDetails() {
  let { id } = useParams();
  const params: string = id as string;
  const [productDetails, setProductDetails] = useState<productsData>();
  const [isLoading, setLoadingState] = useState(true);
  const [errors, setErrors] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<boolean>(false);
  const authHeader = useAuthHeader();
  const authUser: { email: string; isAdmin: boolean } | null = useAuthUser();

  const email = authUser?.email;

  useEffect(() => {
    const fetchInfo = async () => {
      getProductInfo(params)
        .then((response) => {
          if (response) {
            const details: productsData = response as unknown as productsData;
            setProductDetails(details);
          } else {
            setErrors(true);
          }
        })
        .catch(() => {
          setErrors(true);
        })
        .finally(() => {
          setLoadingState(false);
        });
    };
    fetchInfo();
  }, []);

  useEffect(() => {
    const getBookmarks = async () => {
      try {
        let response = await axiosConfig.get(
          `${import.meta.env.VITE_URL}/api/user/bookmarks`,
          {
            headers: {
              Authorization: authHeader,
            },
            params: {
              email: email,
            },
          }
        );
        if (response.status === 200) {
          console.log("response ", response.data);
          return response.data;
        } else {
          return null;
        }
      } catch (err: any) {
        return null;
      }
    };
    getBookmarks();
  });

  useEffect(() => {
    const checkBookmark = async () => {
      try {
        let response = await axiosConfig.get(
          `${import.meta.env.VITE_URL}/api/user/bookmarks`,
          {
            params: {
              email: email,
            },
          }
        );
        if (response.status === 200) {
          if (response.data.bookmarks.includes(productDetails?._id)) {
            setBookmark(true);
          } else {
            setBookmark(false);
          }
        } else {
          setBookmark(false);
        }
      } catch (err: any) {
        setBookmark(false);
      }
    };
    checkBookmark();
  });

  const handleBookmark = async () => {
    if (!bookmark) {
      try {
        let response = await axiosConfig.post(
          `${import.meta.env.VITE_URL}/api/user/add-bookmark`,
          {
            email: email,
            productId: productDetails?._id,
          },
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
        if (response.status === 200) {
          setBookmark(true);
          toastify({ type: "success", text: "Added to Favourites" });
        } else {
          setBookmark(false);
        }
      } catch (err: any) {
        setBookmark(false);
      }
    } else {
      try {
        const details = {
          email: email,
          productId: productDetails?._id,
        };
        let response = await axiosConfig.post(
          `${import.meta.env.VITE_URL}/api/user/remove-bookmark`,
          JSON.stringify(details),
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setBookmark(false);
          toastify({ type: "info", text: "Removed from Favourites" });
        } else {
          setBookmark(true);
        }
      } catch (err: any) {
        setBookmark(true);
      }
    }
  };
  return (
    <PageContainer>
      <ResponsiveNavBar />
      <div className="flex  md:flex-row xxs:flex-col mt-20 mb-60 h-1/4">
        {isLoading ? (
          <LoadingAnimation />
        ) : errors ? (
          <p>Error fetching data</p>
        ) : (
          <div className="rounded-lg xxs:w-full lg:w-3/4 h-2/4">
            <img
              src={productDetails && productDetails.image}
              className="rounded-lg h-full w-full object-cover"
            ></img>
          </div>
        )}
        <div className="xxs:w-full lg:w-2/4 flex flex-col items-center gap-y-10 p-5 overflow-y-scroll">
          <div className="w-full">
            <p className="text-3xl ">{productDetails?.name}</p>
            <p className="text-gray-500">{productDetails?.price}</p>
            <p>Category: {productDetails?.category.type}</p>
          </div>
          <p className="text-base raleway">{productDetails?.description}</p>
          <div className="text-base raleway w-full mb-10">
            Select Size
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
              {productDetails?.sizeVariants.map((item, count) => (
                <button
                  className="text-center raleway p-2 border border-gray-300  rounded-lg cursor-pointer hover:bg-gray-300 duration-500 transition-all "
                  key={count}
                  // onClick={}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col items-center gap-y-10">
            <button className="bg-black/90 hover:bg-black transition-all duration-300 text-white p-4 rounded-full w-full font-bold text-base raleway">
              Add To Cart
              <span className="ml-3">
                <WhiteCartIcon />
              </span>
            </button>
            <button
              className="border border-gray-300 hover:border-black durartion-500 transition-all ease-in-out rounded-full text-black w-full p-4 text-base raleway  font-bold"
              onClick={handleBookmark}
            >
              {bookmark ? "Remove From Favourites" : "Add To Favourites"}
              {bookmark ? (
                <img
                  src="/svg/hearts_filled.svg"
                  className="inline-block ml-3"
                ></img>
              ) : (
                <img src="/svg/hearts.svg" className="inline-block ml-3"></img>
              )}
            </button>
          </div>
          <div className="text-xl raleway w-full cursor-pointer">
            Reviews
            <img
              src="/svg/arrow-down.svg"
              className="inline-block ml-3 cursor-pointer"
            ></img>
          </div>
        </div>
      </div>
      <Footer />
    </PageContainer>
  );
}
