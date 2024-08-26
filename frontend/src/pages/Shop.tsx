import { PageContainer } from "../components/pageContainer";
import ResponsiveNavBar from "../components/responsiveNavBar";
import { Slider } from "../components/slider";
import { useEffect, useState } from "react";
import { productsData } from "../types";
import { fetchProducts } from "../misc/externalCalls";
import { ProductDisplay } from "../components/productsDiv";
import { GridContainer } from "../components/gridContainer";
import { Footer } from "../components/footer";
import Skeleton from "react-loading-skeleton";

function Shop() {
  const [shopProducts, setProducts] = useState<productsData[] | null>([]);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      fetchProducts()
        .then((response) => {
          const result =
            response && response.length > 0
              ? (response[0] as unknown as productsData[])
              : null;
          setProducts(result ? result : []);
          setLoadingState(false);
          // setPageNumbers(total ? total : 1);
        })
        .catch(() => {
          setProducts(null);
        });
    };
    getProducts();
  }, []);

  return (
    <PageContainer>
      <ResponsiveNavBar />
      <Slider
        header=""
        image="./images/freestocks-_3Q3tsJ01nc-unsplash.jpg"
      ></Slider>
      <div className="flex gap-y-10 mt-10 mb-10 justify-center">
        <GridContainer>
          {loadingState &&
            Array.from({ length: 9 }).map((_, count) => (
              <Skeleton height={300} width={300} key={count}></Skeleton>
            ))}
          {shopProducts
            ? shopProducts.map((product) => (
                <ProductDisplay
                  key={product._id}
                  image={product.image}
                  price={product.price}
                  name={product.name}
                  link={`/product/${product.linkName}`}
                />
              ))
            : Array.from({ length: 9 }).map((_, count) => (
                <Skeleton height={300} width={300} key={count}></Skeleton>
              ))}
        </GridContainer>
      </div>
      <Footer></Footer>
    </PageContainer>
  );
}

export default Shop;
