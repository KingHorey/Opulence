import { Filter } from "../components/filter";
import { PageContainer } from "../components/pageContainer";
import ResponsiveNavBar from "../components/responsiveNavBar";
import { Slider } from "../components/slider";
import { useEffect, useState } from "react";
import { productsData } from "../types";
import { fetchProducts } from "../misc/externalCalls";
import { ProductDisplay } from "../components/productsDiv";
import { GridContainer } from "../components/gridContainer";
import { Footer } from "../components/footer";

function Shop() {
  const [shopProducts, setProducts] = useState<productsData[] | null>([]);

  useEffect(() => {
    const getProducts = async () => {
      fetchProducts()
        .then((response) => {
          const result =
            response && response.length > 0
              ? (response[0] as unknown as productsData[])
              : null;
          // const total =
          //   response && response.length > 0
          //     ? (response[1] as unknown as number)
          //     : null;
          // setProductState(false);
          setProducts(result ? result : []);
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
      <div className="flex gap-y-5 mt-10">
        <Filter />
        <GridContainer>
          {shopProducts !== null &&
            shopProducts.map((product) => (
              <ProductDisplay
                key={product._id}
                image={product.image}
                price={product.price}
                name={product.name}
                link={product.linkName}
              />
            ))}
        </GridContainer>
      </div>
      <Footer></Footer>
    </PageContainer>
  );
}

export default Shop;
