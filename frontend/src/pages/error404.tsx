export function Error404() {
  return (
    <div className="flex flex-col  items-center justify-center h-screen w-screen">
      <p className="xxs:text-2xl md:text-3xl text-center mb-2">
        Uh-Oh, turns out the page you are looking for does not exist
      </p>
      <p className="xxs:text-[10rem] md:text-[20rem] text-center font-grames">
        404
      </p>
      <p className="text-2xl">You can head to the </p>
      <a href="/" className="bg-stone-400 border p-2 text-xl">
        homepage
      </a>
    </div>
  );
}
