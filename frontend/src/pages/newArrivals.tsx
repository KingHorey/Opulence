import axios from "axios";
import { useEffect, useState } from "react";
import ResponsiveNavBar from "../components/responsiveNavBar";
import { PageContainer } from "../components/pageContainer";
import { H2Tags } from "../components/headers";
import { SideBar } from "../components/sideBar";
// import Skeleton from "react-loading-skeleton";
import { BigLoadingAnimation, LoadingAnimation } from "../components/svg";
import { filterCategories, productsData } from "../types";
import { ProductDisplay } from "../components/productsDiv";
// import { ProductDisplay } from "../components/productsDiv";

function NewArrivals() {
  const [newArrivals, setNewArrivals] = useState<productsData[]>([]);
  const [categories, setCategories] = useState<null | filterCategories[]>([]);
  const [productCategoriesState, setProductCategoriesState] = useState(true);
  const [productState, setProductState] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products/all-categories", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCategories(response.data);
          setProductCategoriesState(false);
        } else {
          console.error("An error occured");
          setProductCategoriesState(false);
        }
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products/new-arrivals", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setTimeout(() => {
            setProductState(false);
          }, 10000);
          setNewArrivals(response.data);
          // setProductState(false);
        } else {
          setTimeout(() => {
            setProductState(false);
          }, 10000);
          console.error("An error occured");
          setNewArrivals([]);
          // setProductState(false);
        }
      })
      .catch((err) => console.error(err.message));
  }, []);
  return (
    <PageContainer>
      <ResponsiveNavBar />
      <div className="">
        <H2Tags text="New Arrivals" />
      </div>
      <hr></hr>
      <div className="flex ">
        {productCategoriesState ? (
          <LoadingAnimation />
        ) : (
          <SideBar>
            <div className="lg:w-2/4flex-col gap-5  bg-[#fefefe] border-r-gray border-r h-screen">
              <form action="" className="flex flex-col gap-2 justify-start">
                <h3 className="xxs:text-xs md:text-md lg:text-xl raleway mt-3 mb-3">
                  Product Type
                </h3>
                {categories &&
                  categories.map((item) => (
                    <label
                      className="xxs:text-[0.6rem] lg:text-sm raleway lg:ml-5 mb-2"
                      key={item._id}
                    >
                      <input
                        type="checkbox"
                        className="p-5 accent-blue-300 mr-2"
                      />
                      {item.type}
                    </label>
                  ))}
              </form>
            </div>
          </SideBar>
        )}
        <div className="w-full mt-5 h-screen flex items-center">
          {productState ? (
            <div className="m-auto">
              <BigLoadingAnimation />
            </div>
          ) : (
            <div>
              {newArrivals.map((item) => {
                return (
                  <ProductDisplay
                    name={item.name}
                    price={item.price}
                    image={item.image}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default NewArrivals;
