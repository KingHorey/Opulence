import { GridContainer } from "../../components/gridContainer";
import { ProductDisplay } from "../../components/productsDiv";
import { useLocation } from "react-router-dom";
import ResponsiveNavBar from "../../components/responsiveNavBar";
import { PageContainer } from "../../components/pageContainer";
import { Footer } from "../../components/footer";
import Pagination from "../../components/Pagination";

export function ProductsPage() {
  const location = useLocation();
  console.log(location);
  const { searchResults, title } = location.state || {};
  console.log(title);
  return (
    <PageContainer>
      <ResponsiveNavBar />
      <h4 className="raleway text-xl font-semibold mb-3">{title} Products</h4>
      <hr className="mb-5"></hr>
      {searchResults.length <= 0 && (
        <>
          <p className="text-5xl text-center my-auto poppins-regular mb-3">
            Oops!
          </p>
          <p className="text-2xl text-center my-auto poppins-regular">
            Brand is either not in our catalogue, or does not have any products
          </p>
        </>
      )}
      <GridContainer>
        {searchResults &&
          searchResults.map((item: any) => {
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
      <div className="flex justify-center">
        <Pagination
          currentPage={1}
          totalDocuments={searchResults.length}
          limit={9}
        ></Pagination>
      </div>
      <Footer />
    </PageContainer>
  );
}
