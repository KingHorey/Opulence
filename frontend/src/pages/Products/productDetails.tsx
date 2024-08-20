import { Footer } from "../../components/footer";
import { PageContainer } from "../../components/pageContainer";
import ResponsiveNavBar from "../../components/responsiveNavBar";
import { LoadingAnimation, WhiteCartIcon } from "../../components/svg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductInfo } from "../../misc/externalCalls";
import { productsData } from "../../types";

export function ProductDetails() {
  let { id } = useParams();
  const params: string = id as string;
  const [productDetails, setProductDetails] = useState<productsData>();
  const [isLoading, setLoadingState] = useState(true);
  const [errors, setErrors] = useState<boolean>(false);

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
                <div
                  className="text-center raleway p-2 border border-gray-300  rounded-lg cursor-pointer hover:bg-gray-300 duration-500 transition-all "
                  key={count}
                >
                  {item}
                </div>
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
            <button className="border border-gray-300 hover:border-black durartion-500 transition-all ease-in-out rounded-full text-black w-full p-4 text-base raleway  font-bold">
              Add To Favourites
              <img src="/svg/hearts.svg" className="inline-block ml-3"></img>
            </button>
          </div>
          <div className="text-xl raleway w-full cursor-pointer select-none">
            Reviews
            <img
              src="/svg/arrow-down.svg"
              className="inline-block ml-3 cursor-pointer select-none"
            ></img>
          </div>
        </div>
      </div>
      <Footer />
    </PageContainer>
  );
}
