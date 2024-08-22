import ResponsiveNavBar from "../components/responsiveNavBar";
import { PageContainer } from "../components/pageContainer";
import { useSelector } from "react-redux";
import { cartProduct } from "../types";

/**
 * CartPage component
 *
 * Renders the cart page with a responsive navigation bar, cart items, and total cart cost.
 *
 * @returns {JSX.Element} The cart page component
 */

export function CartPage() {
  const cart = useSelector((state: any) => state.cart.cartItems);

  return (
    <PageContainer>
      <ResponsiveNavBar />
      {
        <main className="flex flex-col mx-auto gap-3 ">
          <div className="flex gap-5">
            <div className="w-3/4  border border-gray-300 rounded-lg  p-2 bg-[#FDFFFF]">
              {cart.length > 0 && (
                <p className="text-xl font-bold capitalize">
                  Items in cart ({cart.length})
                </p>
              )}
              {cart.length > 0 &&
                cart.map((item: cartProduct, count: number) => {
                  return (
                    <div
                      className="bg-white h-[100px] flex items-center justify-between p-2"
                      key={count}
                    >
                      <div className="h-full mr-auto">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <section className="flex  gap-10 mr-auto w-[40%]">
                        <div className="text-center w-2/4">
                          <p className="text-base font-bold">Product Name</p>
                          <p className="text-base">{item.name}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-base font-bold">Quantity</p>
                          <p>{item.amount}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-base font-bold">Price</p>
                          <p>{item.price}</p>
                        </div>
                      </section>
                      <div className="ml-5">
                        <button title="Remove from cart">
                          <img src="/svg/trash-03.svg"></img>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="w-1/4 h-[150px] flex  flex-col justify-between border border-gray-300 rounded-lg p-2">
              <p className="text-xl font-bold mb-10">Total Cart Cost</p>
              <hr></hr>
              {cart.length > 0 ? (
                <p className="text-xl font-semibold">
                  Total:
                  <span className="ml-5 text-lg font-bold">
                    <span className="text-sm mr-1">&#x20A6;</span>
                    {cart.reduce((total: number, item: cartProduct) => {
                      return (total += item.price);
                    }, 0)}
                  </span>
                </p>
              ) : (
                <p>Cart is Empty</p>
              )}
              <hr></hr>
            </div>
          </div>
        </main>
      }
      {cart.length === 0 && <p>No items in cart</p>}
    </PageContainer>
  );
}
