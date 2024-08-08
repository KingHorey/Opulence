export function NewsLetter() {
  return (
    <div className="mt-20 mb-10 xxs:flex">
      <div className="lg:w-2/4 mr-auto ml-auto text-center">
        <p className="xxs:text-2xl md:text-3xl lg:text-5xl font-bold mb-5">
          Get Notified on every Arrival, Discount and Fashion Tips{" "}
        </p>
        <form>
          <input
            type="email"
            className="border border-gray-400 mr-2 p-1 rounded-md"
            placeholder="email address"
            required
            aria-required
          ></input>

          <button className="bg-[#417A9F] hover:bg-blue-400 duration-500 transition-all text-slate-50 p-1 rounded-md">
            Subscribe
          </button>
        </form>
        <p className="text-gray-500 text-base mt-2">Unsubscribe Anytime</p>
      </div>
    </div>
  );
}
