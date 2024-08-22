import { NavLink } from "react-router-dom";

export function SmallProductsPick(props: {
  title: string;
  image: string;
  link: string;
}) {
  return (
    <div className="xxs:w-3/4 md:w-1/4 h-[200px] relative rounded-md flex-grow-0">
      <img
        src={props.image}
        className="w-full h-full object-cover rounded-md"
      ></img>
      <a
        href={props.link}
        className="bg-[#f5f5f5] text-black absolute bottom-[-3%] left-5 w-[80%] rounded-md mr-auto ml-auto text-center  p-2 lg:text-xl shadow-sm xxs:text-xs md:text-md shadow-[#353535] "
      >
        {props.title} <span className="ml-3 h-fit">&#10149;</span>
      </a>
    </div>
  );
}

export function LargeProductsPick(props: {
  title: string;
  image: string;
  link: string;
}) {
  return (
    <div className="inline-block mr-10 xxs:w-w/4 md:w-1/4 h-[400px] relative rounded-md flex-grow-0 shadow-lg mb-5">
      <img
        src={props.image}
        className="w-full h-full object-cover rounded-md"
      ></img>
      <a
        href={props.link}
        className="bg-[#f5f5f5] text-black absolute bottom-[-3%] left-5 w-[80%] rounded-md mr-auto ml-auto text-center shadow-[#353535]  shadow-sm p-2 lg:text-xl xxs:text-xs md:text-md"
      >
        {props.title} <span className="ml-3 h-fit">&#10149;</span>
      </a>
    </div>
  );
}

export function ProductDisplay({
  image,
  name,
  price,
  link,
}: {
  image: string;
  name: string;
  price: number;
  link: string;
}) {
  return (
    <NavLink
      to={link}
      className="pl-2 pr-2 accent-blue-300 mr-2 xxs:text[.5rem] lg:text-[.9rem] raleway font-semibold ml-2 w-fit"
    >
      <div className="flex flex-col  h-full max-w-[300px] gap-4 hover:shadow-xl p-2 duration-300 transition-all rounded-xl">
        <img
          src={image}
          className="w-full h-[80%] object-cover rounded-lg "
        ></img>
        <div>
          <p className="xxs:text-base lg:text-xs poppins-regular text-nowrap text-ellipsis overflow-hidden w-full">
            {name}
          </p>
          <p className="text-sm text-slate-700 mt-1  poppins-regular-semibold">
            <span className="text-sm raleway mr-1">&#8358;</span>
            {price}
          </p>
        </div>
      </div>
    </NavLink>
  );
}
