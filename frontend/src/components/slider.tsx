// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

// export function Slider(): JSX.Element {
//   return (
//     <Swiper
//       modules={[Navigation, Pagination, Scrollbar, A11y]}
//       spaceBetween={5}
//       slidesPerView={3}
//       navigation
//       pagination={{ clickable: true }}
//       scrollbar={{ draggable: true }}
//       className="w-full h-96"
//     >
//       <SwiperSlide className="w-full">
//         <img src="/s'watch shop.jpg" className="w-full"></img>
//       </SwiperSlide>
//       <SwiperSlide>Slide 2</SwiperSlide>
//       <SwiperSlide>Slide 3</SwiperSlide>
//       <SwiperSlide>Slide 4</SwiperSlide>
//     </Swiper>
//   );
// }

export function Slider({ header, image }: { header: string; image: string }) {
  return (
    <div className="w-full rounded-md mb-5 relative">
      <img
        src={image}
        className="w-full xs:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-md"
      ></img>
      <p className="absolute text-slate-50 top-[50%] translate-y-[-50%] xxs:text-3xl md:text-6xl lg:text-8xl text-center font-bold poppins-bold stroke-black stroke-1">
        {header}
      </p>
    </div>
  );
}

export function SmallerSlider({ image }: { image: string }) {
  return (
    <div className="relative border rounded-t-full h-full xs:h-full md:h-[300px] lg:h-[400px] xxs:w-[80px] md:w-full lg:w-full">
      <img
        src={image}
        className="w-full xs:h-full md:h-[300px] lg:h-[400px] object-cover rounded-md rounded-t-full"
      ></img>
    </div>
  );
}
