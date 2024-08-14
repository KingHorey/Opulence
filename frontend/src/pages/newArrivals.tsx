import axios from "axios";
import { useEffect, useState } from "react";
import ResponsiveNavBar from "../components/responsiveNavBar";
import { PageContainer } from "../components/pageContainer";
import { BigLoadingAnimation, LoadingAnimation } from "../components/svg";
import { filterCategories, productsData } from "../types";
import { ProductDisplay } from "../components/productsDiv";
import { SmallerSlider } from "../components/slider";
import { Footer } from "../components/footer";
import Pagination from "../components/Pagination";

function NewArrivals() {
  const [newArrivals, setNewArrivals] = useState<productsData[]>([]);
  const [categories, setCategories] = useState<null | filterCategories[]>([]);
  const [pageNumbers, setPageNumbers] = useState(1);
  const [productCategoriesState, setProductCategoriesState] = useState(true);
  const [productState, setProductState] = useState(true);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/api/products/all-categories`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCategories(response.data);
          setProductCategoriesState(false);
        } else {
          setProductCategoriesState(false);
        }
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/api/products/new-arrivals`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setTimeout(() => {
            setProductState(false);
          }, 10000);
          setNewArrivals(response.data.data);
          setPageNumbers(response.data.total);
          // setProductState(false);
        } else {
          setTimeout(() => {
            setProductState(false);
          }, 10000);
          setNewArrivals([]);
          // setProductState(false);
        }
      })
      .catch((err) => console.error(err.message));
  }, []);
  return (
    <PageContainer>
      <ResponsiveNavBar />
      <div className="flex flex-col w-full  items-center relative  gradient rounded-md">
        <p className=" text-center raleway mt-5 select-none pl-2 pr-2 text-xs font-semibold">
          New Arrivals
        </p>
        <div className="flex flex-col gap-3 mt-5 items-center w-2/4">
          <p className="poppins-regular xxs:text-3xl lg:text-5xl font-bold text-center capitalize stroke-white stroke-2 select-none">
            Luxury that fits every occasion
          </p>
          <p className="text-center xxs:text-sm lg:text-lg">
            Our new arrivals bring you a curated selection of premium garments,
            meticulously designed to provide a flawless fit that elevates your
            wardrobe
          </p>
          <a
            href="#categories"
            className="bg-black text-slate-50 pl-2 pr-2 border-black text-lg rounded-full"
          >
            Browse Arrivals
          </a>
        </div>
        <div className="flex xxs:gap-4 md:gap-5 mt-10 pl-2 pr-2 h-fit">
          <div className="-rotate-3 mb-5">
            <SmallerSlider image="/images/mohamadreza-khashay-ziubUDopHmc-unsplash.jpg"></SmallerSlider>
          </div>
          <div className="-rotate-3 mb-5">
            <SmallerSlider image="/images/alexi-romano-CCx6Fz_CmOI-unsplash.jpg"></SmallerSlider>
          </div>
          <div className="rotate-3 mb-5">
            <SmallerSlider image="/images/clem-onojeghuo-7a6ptA97LXA-unsplash.jpg"></SmallerSlider>
          </div>
          <div className="rotate-3 mb-5">
            <SmallerSlider image="/images/carlos-vaz-KP4bxnxAilU-unsplash.jpg"></SmallerSlider>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-10 font-bold text-2xl">
        <div className="flex flex-col gap-5" id="categories">
          <p>Our Products</p>
          {productCategoriesState ? (
            <LoadingAnimation />
          ) : (
            <div className="lg:w-full flex-col gap-5  bg-[#fefefe] border-r-gray border-r">
              {categories &&
                categories.map((item) => (
                  <a
                    className="pl-2 pr-2 accent-blue-300 mr-2 xxs:text[.5rem] lg:text-[.9rem] border-black border rounded-full raleway font-semibold ml-2"
                    key={item._id}
                    href={`/product/categories/${item.type.toLowerCase()}`}
                  >
                    {item.type}
                  </a>
                ))}
            </div>
          )}

          <div className="w-full mt-3  flex bg-white mb-10">
            {productState ? (
              <div className="m-auto">
                <BigLoadingAnimation />
              </div>
            ) : (
              <div className="w-screen">
                <div className="mr-auto ml-auto  xxs:grid xxs:grid-cols-2 lg:grid lg:grid-cols-3 md:gap-y-5  lg:gap-x-5 lg:gap-y-10 h-full xxs:gap-y-5 xxs:gap-x-5">
                  {newArrivals.map((item) => {
                    return (
                      <a
                        href={`/${item.brand}/${item._id}`}
                        key={item._id}
                        className="lg:h-full lg:w-fit h-[400px] xxs:w-fit md:w-[300px]"
                      >
                        <ProductDisplay
                          name={item.name}
                          price={item.price}
                          image={item.image}
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <Pagination currentPage={1} totalPages={pageNumbers}></Pagination>
        </div>
      </div>
      <Footer />
    </PageContainer>
  );
}

export default NewArrivals;
