import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { PageContainer } from "../../components/pageContainer";
import ResponsiveNavBar from "../../components/responsiveNavBar";
import { productCategories } from "../../misc/externalCalls";
import { productsData } from "../../types";
import Skeleton from "react-loading-skeleton";
import { GridContainer } from "../../components/gridContainer";
import { ProductDisplay } from "../../components/productsDiv";
import { Footer } from "../../components/footer";
import Pagination from "../../components/Pagination";

export function BrandPage() {
  const location = useLocation();
  const brandName = location.pathname.split("/")[2];

  const [products, setProducts] = useState<productsData[] | null>();
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    const getInformation = async () => {
      const data = await productCategories(brandName);
      setProducts(data.data);
      setLoadingState(false);
      setPageNumber(data.total);
    };
    getInformation();
  }, []);

  return (
    <PageContainer>
      <ResponsiveNavBar />
      <main>
        <h3 className="text-4xl raleway mb-10">{brandName}</h3>
        <GridContainer>
          {loadingState
            ? Array.from({ length: 9 }).map((_, i) => (
                <Skeleton width={300} height={300} key={i} />
              ))
            : products?.map((item) => (
                <ProductDisplay
                  key={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  link={`/product/${item.linkName}`}
                />
              ))}
        </GridContainer>
        <div className="flex justify-center">
          <Pagination currentPage={1} totalDocuments={pageNumber} limit={9} />
        </div>
      </main>
      <Footer />
    </PageContainer>
  );
}
