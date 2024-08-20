import { Footer } from "../../components/footer";
import { PageContainer } from "../../components/pageContainer";
import ResponsiveNavBar from "../../components/responsiveNavBar";
import { WhiteCartIcon } from "../../components/svg";

export function ProductDetails() {
  return (
    <PageContainer>
      <ResponsiveNavBar />
      <div className="flex  lg:flex-row xxs:flex-col mt-20 mb-60 h-1/4">
        <div className="rounded-lg w-3/4 h-2/4">
          <img
            src="./images/mukuko-studio-mU88MlEFcoU-unsplash.jpg"
            className="rounded-lg h-full w-full object-cover"
          ></img>
        </div>
        <div className="w-2/4 flex flex-col items-center gap-y-10 p-5 overflow-y-scroll">
          <div className="w-full">
            <p className="text-3xl ">Lorem Ipsum</p>
            <p className="text-gray-500">$40.54</p>
            <p>Category: Unisexual</p>
          </div>
          <p className="text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quam
            illo odio, consectetur accusantium placeat ut officia ipsam
            explicabo et alias debitis totam odit! Fugiat soluta non esse harum
            molestias?
          </p>
          <div className="text-base raleway w-full mb-10">
            Select Size
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
              <div className="text-center raleway p-2 border border-gray-300  rounded-lg">
                XL
              </div>
              <div className="text-center raleway p-2 border border-gray-300  rounded-lg">
                XL
              </div>
              <div className="text-center raleway p-2 border border-gray-300  rounded-lg">
                XL
              </div>
              <div className="text-center raleway p-2 border border-gray-300  rounded-lg">
                XL
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center gap-y-10">
            <button className="bg-black/90 hover:bg-black transition-all duration-300 text-white p-4 rounded-full w-full font-bold text-base raleway">
              Add To Cart
              <span className="ml-3">
                <WhiteCartIcon />
              </span>
            </button>
            <button className="border border-black rounded-full text-black w-full p-4 text-base raleway  font-bold">
              Add To Favourites
              <img src="./svg/hearts.svg" className="inline-block ml-3"></img>
            </button>
          </div>
          <div className="text-xl raleway w-full cursor-pointer">
            Reviews
            <img
              src="./svg/arrow-down.svg"
              className="inline-block ml-3 cursor-pointer"
            ></img>
          </div>
        </div>
      </div>
      <Footer />
    </PageContainer>
  );
}
