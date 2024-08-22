import { useEffect, useState } from "react";
import ResponsiveNavBar from "../components/responsiveNavBar";
import { PageContainer } from "../components/pageContainer";
import { BigLoadingAnimation, LoadingAnimation } from "../components/svg";
import { filterCategories, productsData } from "../types";
import { ProductDisplay } from "../components/productsDiv";
import { SmallerSlider } from "../components/slider";
import { Footer } from "../components/footer";
import Pagination from "../components/Pagination";
import { fetchCategories, fetchProducts } from "../misc/externalCalls";
import { GridContainer } from "../components/gridContainer";
import { axiosConfig } from "../misc/axiosConfig";

function NewArrivals() {
  const [newArrivals, setNewArrivals] = useState<productsData[] | null>([]);
  const [categories, setCategories] = useState<null | filterCategories[]>([]);
  const [pageNumbers, setPageNumbers] = useState(1);
  const [productCategoriesState, setProductCategoriesState] = useState(true);
  const [productState, setProductState] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const checkItemSelectedStatus = (data: string) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(data)) {
        return prevItems.filter((item) => item !== data);
      } else {
        return [...prevItems, data];
      }
    });
  };
  useEffect(() => {
    const handeCategories = async () => {
      fetchCategories()
        .then((response) => {
          if (response) {
            setCategories(response);
            setProductCategoriesState(false);
          }
        })
        .catch(() => {
          setCategories(null);
          setProductCategoriesState(false);
        });
    };
    handeCategories();
  }, []);

  useEffect(() => {
    const handleProducts = async () => {
      if (selectedItems.length >= 1) {
        const params = new URLSearchParams();
        for (let item of selectedItems) {
          params.append("category", item);
        }
        const url = params.toString();
        try {
          let result = await axiosConfig.get(`/api/products/new-arrivals`, {
            params: {
              category: url,
            },
          });
          if (result.status === 200) {
            const data = result.data.data;
            setNewArrivals(data);
          } else {
            setNewArrivals(null);
          }
        } catch {
          setNewArrivals(null);
        }
      } else {
        fetchProducts()
          .then((response) => {
            const result =
              response && response.length > 0
                ? (response[0] as unknown as productsData[])
                : null;
            const total =
              response && response.length > 0
                ? (response[1] as unknown as number)
                : null;
            setProductState(false);
            setNewArrivals(result ? result : []);
            setPageNumbers(total ? total : 1);
          })
          .catch(() => {
            setProductState(false);
            setNewArrivals(null);
          });
      }
    };
    handleProducts();
  }, [selectedItems]);

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
                  <button
                    className={
                      selectedItems.includes(item._id)
                        ? "pl-2 pr-2 py-1  mr-2 xxs:text[.5rem] lg:text-[.8rem] border-gray-300 border rounded-lg raleway ml-2 bg-gray-300 text-white"
                        : "pl-2 pr-2 py-1 accent-blue-300 mr-2 xxs:text[.5rem] lg:text-[.8rem] border-gray-300 border rounded-lg raleway ml-2"
                    }
                    onClick={() => checkItemSelectedStatus(item._id)}
                    key={item._id}
                  >
                    {item.type}
                  </button>
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
                <GridContainer>
                  {newArrivals &&
                    newArrivals.map((item) => {
                      return (
                        <ProductDisplay
                          key={item._id}
                          name={item.name}
                          price={item.price}
                          image={item.image}
                          link={`/product/${item.linkName}`}
                        />
                        // </a>
                      );
                    })}
                </GridContainer>
                {newArrivals?.length === 0 && (
                  <div className="raleway text-center">No Items</div>
                )}
              </div>
            )}
          </div>
          <Pagination currentPage={1} totalDocuments={40}></Pagination>
        </div>
      </div>
      <Footer />
    </PageContainer>
  );
}

export default NewArrivals;
