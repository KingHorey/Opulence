import { InfiniteBrandScroll } from "../components/brandScroller";
import { Footer } from "../components/footer";
import { ContextBlock, PageHeaders, SmallDivs } from "../components/misc";
import { NewsLetter } from "../components/newsLetter";
import {
  LargeProductsPick,
  SmallProductsPick,
} from "../components/productsDiv";
import { Slider } from "../components/slider";
import { PageTitle } from "../misc/pageTitle";
import { PageContainer } from "../components/pageContainer";
import ResponsiveNavBar from "../components/responsiveNavBar";

export default function HomePage() {
  PageTitle({ title: "Welcome To Opulence" });
  return (
    <PageContainer>
      <ResponsiveNavBar />
      <Slider
        header="People will stare. Make it worth their while."
        image="https://res.cloudinary.com/db2agmwon/image/upload/f_auto,q_auto/sklgid0vdiesz5zl4n1m"
      ></Slider>
      <p className="font-bold text-3xl mb-3 zain-bold">Brands</p>
      <InfiniteBrandScroll />
      <ContextBlock
        title={"Ensuring unparalleled customer satisfaction"}
        quote={"Delivering happiness with true and original merchandise"}
      />
      <div className="flex gap-2 mt-10 mb-20">
        <div>
          <SmallDivs path="/svg/hours-clock-24-hours-stopwatch-time-timer-watch-svgrepo-com.svg" />
          <p className="font-bold lg:text-xl xxs:text-xs md:text-sm">
            24 / 7 customer support
          </p>
          <p className="text-gray-500 text-base xxs:text-xs lg:text-base">
            Round the clock support so you can get help when you need it
          </p>
        </div>
        <div>
          <SmallDivs path="/svg/delivery-svgrepo-com.svg" />
          <p className="font-bold lg:text-xl xxs:text-xs md:text-sm">
            Fast Delivery
          </p>
          <p className="text-gray-500 text-base xxs:text-xs lg:text-base">
            Partnering with various well known delivery outlets, we fast and
            free delivery
          </p>
        </div>
        <div>
          <SmallDivs path="/svg/chat-svgrepo-com.svg" />
          <p className="font-bold lg:text-xl xxs:text-xs md:text-sm">
            24 / 7 customer support
          </p>
          <p className="text-gray-500 text-base xxs:text-xs lg:text-base">
            Round the clock support so you can get help when you need it
          </p>
        </div>
        <div>
          <SmallDivs path="/svg/return-cashback-money-svgrepo-com.svg" />
          <p className="font-bold lg:text-xl xxs:text-xs md:text-sm">
            Money back guaranteed
          </p>
          <p className="text-gray-500 text-base xxs:text-xs lg:text-base">
            Should any of our products not satisfy your demands, refunds can be
            placed within 3 days of receipt
          </p>
        </div>
      </div>
      <div className="mb-10">
        <PageHeaders title="Just for you" />
        <div className="flex md:flex-row xxs:flex-col gap-10 xxs:items-center">
          <SmallProductsPick
            title="Top Picks"
            image="/images/240725_21h36m59s_screenshot.png"
            link="/"
          />
          <SmallProductsPick
            title="Casuals"
            image="/images/240725_21h37m26s_screenshot.png"
            link="/"
          />
          <SmallProductsPick
            title="Top Picks"
            image="/images/240725_21h36m59s_screenshot.png"
            link="/"
          />
          <SmallProductsPick
            title="Casuals"
            image="/images/240725_21h37m26s_screenshot.png"
            link="/"
          />
        </div>
      </div>
      <div className="mt-20 mb-10">
        <PageHeaders title="Featured Products" />
        <div className="inline-block md:flex-row xxs:flex-col gap-10 xxs:items-center whitespace-nowrap overflow-x-scroll  last:mr-0">
          <LargeProductsPick
            title="Top Picks"
            image="/images/240725_21h36m59s_screenshot.png"
            link="/"
          />
          <LargeProductsPick
            title="Casuals"
            image="/images/240725_21h37m26s_screenshot.png"
            link="/"
          />
          <LargeProductsPick
            title="Top Picks"
            image="/images/240725_21h36m59s_screenshot.png"
            link="/"
          />
          <LargeProductsPick
            title="Casuals"
            image="/images/240725_21h37m26s_screenshot.png"
            link="/"
          />
        </div>
      </div>
      <div>
        <NewsLetter />
      </div>
      <Footer />
    </PageContainer>
  );
}
