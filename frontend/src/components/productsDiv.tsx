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
}: {
  image: string;
  name: string;
  price: number;
}) {
  return (
    <div className="lg:w-[100px] lg:h-[120px]">
      <img src={image} className="w-full h-[90%] object-cover"></img>
      <p>{name}</p>
      <p>{price}</p>
    </div>
  );
}
