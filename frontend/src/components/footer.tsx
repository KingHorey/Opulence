export function Footer() {
  return (
    <div className="mt-10 bg-[#284B63] flex xxs:flex-col md:flex-row gap-5 justify-evenly items-center text-slate-50 md:h-[250px] lg:h-[300px]">
      <div className="xxs:w-full md:w-2/5">
        <p className="lg:text-5xl xxs:text-2xl font-cerotta font-bold text-center">
          Opulence
        </p>
        <p className="text-base font-light text-center">Elegance in style</p>
      </div>
      <div className="flex flex-col h-[150px] justify-evenly md:w-1/5 text-center">
        <p className="text-3xl font-bold">Shop</p>
        <ul className="text-natural-200 flex w-full text-center gap-3 md:block">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">New Arrivals</a>
          </li>
          <li>
            <a href="#">Top Picks</a>
          </li>
          {/* <li>
            <a href="#">Brands</a>
          </li> */}
        </ul>
      </div>
      <div className="flex flex-col h-[150px] justify-evenly md:w-1/5 text-center">
        <p className="text-3xl font-bold">Company</p>
        <ul className="text-natural-200 flex w-full text-center  md:block">
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Affilate Companies</a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col h-[150px] justify-evenly  md:w-1/5 text-center">
        <p className="text-3xl font-bold">Support</p>
        <ul className="text-natural-200 flex w-full text-center gap-3 md:block">
          <li>
            <a href="#" className="">
              FAQs
            </a>
          </li>
          <li>
            <a href="#">Cookie Policy</a>
          </li>
          <li>
            <a href="#">Terms of Use</a>
          </li>
          {/* <li>
            <a href="#">Privacy Policy</a>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
