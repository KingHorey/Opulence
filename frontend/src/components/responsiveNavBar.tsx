import { NavBar, SmallNavBar } from "./navBar";

function ResponsiveNavBar() {
  return (
    <>
      <div className="xxs:hidden md:block">
        <NavBar />
      </div>
      <div className="md:hidden">
        <SmallNavBar />
      </div>
    </>
  );
}

export default ResponsiveNavBar;
