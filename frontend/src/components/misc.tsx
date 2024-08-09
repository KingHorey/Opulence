export function ContextBlock(props: { title: string; quote: string }) {
  return (
    <div className="w-full lg:h-[70px] flex justify-between items-center text-black">
      <div className="lg:w-fit text-wrap">
        <p className="xxs:text-sm md:text-xl lg:text-4xl font-bold">
          {props.title}
        </p>
      </div>
      <div className="xxs:text-[.6rem] md:text-xl lg:text-base flex items-center border-l-2 border-l-black h-full p-2">
        <p>{props.quote}</p>
      </div>
    </div>
  );
}

export function PageHeaders(props: { title: string }) {
  return (
    <h3 className="text-black lg:text-4xl font-bold mt-5 mb-3">
      {props.title}
    </h3>
  );
}

export function SmallDivs(props: { path: string }) {
  return (
    <div className="rounded-md bg-[#EBEBEB] xxs:w-[30px] xxs:h-[30px] md:w-[45px] md:h-[45px] lg:w-[50px] lg:h-[50px] p-2 mb-2 border border-[#353535]">
      <img src={props.path} className="w-full h-full"></img>
    </div>
  );
}


