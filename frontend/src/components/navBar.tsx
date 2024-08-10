import { CartIcon, UserIcon } from "./svg";
import { NavLink } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useAuthStatus } from "../misc/customHooks";

export function NavBar(): JSX.Element {
  const isAuthenticated = useAuthStatus();
  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <nav className="flex w-full mb-10">
      <ul className="flex w-full justify-between items-center">
        <li>
          <NavLink
            to="/home"
            className="mr-auto text-black sm:text-base lg:text-3xl font-bold font-cerotta"
          >
            Opulence
          </NavLink>
        </li>
        <div className="flex gap-5 mr-auto ml-auto items-center font-medium ms:text-base lg:text-md">
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) => {
                return isActive
                  ? "capitalize sm:text-sm lg:text-base bg-black text-white rounded-md p-1"
                  : "capitalize sm:text-sm lg:text-base";
              }}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) => {
                return isActive
                  ? "capitalize sm:text-sm lg:text-base bg-black text-white rounded-md p-1"
                  : "capitalize sm:text-sm lg:text-base";
              }}
            >
              Most Wanted
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new-arrivals"
              className={({ isActive }) => {
                return isActive
                  ? "capitalize sm:text-sm lg:text-base bg-black text-white rounded-md p-1"
                  : "capitalize sm:text-sm lg:text-base";
              }}
            >
              New Arrivals
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop/brands"
              className={({ isActive }) => {
                return isActive
                  ? "capitalize sm:text-sm lg:text-base bg-black text-white rounded-md p-1"
                  : "capitalize sm:text-sm lg:text-base";
              }}
            >
              Brands
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact-us"
              className={({ isActive }) => {
                return isActive
                  ? "capitalize sm:text-sm lg:text-base bg-black text-white rounded-md p-1"
                  : "capitalize sm:text-sm lg:text-base";
              }}
            >
              About/Contact
            </NavLink>
          </li>
        </div>
        <div className="flex ml-10">
          <form onSubmit={handleSearch} className="mr-3">
            <input
              type="search"
              className="border border-gray-400 rounded-md relative w-[90px]"
              placeholder="search"
            ></input>
            <button className="inline absolute h-full top-[2px] mr-2">
              <i className="fa-solid fa-magnifying-glass absolute right-1 h-fit lg:top-2 md:top-1"></i>
            </button>
          </form>
          <div>
            <CartIcon />
          </div>
          <div className="cursor-pointer">
            {isAuthenticated ? (
              <NavLink to="/profile/personal-info">
                <UserIcon />
              </NavLink>
            ) : (
              <NavLink to="/login" className="capitalize">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </ul>
    </nav>
  );
}

export function SmallNavBar(): JSX.Element {
  const isAuthenticated = useAuthStatus();

  const [sideBar, showSideBar] = useState(false);
  function handleSideBar() {
    showSideBar(!sideBar);
  }
  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <nav className="flex w-full mb-10">
      <ul className="flex w-full justify-between items-center">
        <li>
          <NavLink
            to="/home"
            className="mr-auto text-black sm:text-base lg:text-3xl font-bold font-cerotta"
          >
            Opulence
          </NavLink>
        </li>
        <li className="cursor-pointer">
          <div>
            <i className="fa-solid fa-bars" onClick={handleSideBar}></i>
          </div>
          {sideBar ? (
            <div className="flex flex-col gap-5 mr-auto ml-auto items-center font-medium ms:text-base lg:text-md absolute left-0 z-[999] bg-offWhite w-full">
              <li>
                <NavLink
                  to="/shop"
                  className="capitalize sm:text-sm lg:text-base"
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className="capitalize lg:text-base sm:text-sm"
                >
                  Most Wanted
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className="capitalize sm:text-sm lg:text-base"
                >
                  New Arrivals
                </NavLink>
              </li>
              <li>
                <a href="" className="capitalize sm:text-sm lg:text-base">
                  Brands
                </a>
              </li>
              <li>
                <NavLink
                  to="/contact-us"
                  className="capitalize sm:text-sm lg:text-base"
                >
                  About/Contact
                </NavLink>
              </li>

              <div className="flex flex-col gap-5 mr-auto ml-auto items-center">
                <form onSubmit={handleSearch} className="mr-3">
                  <input
                    type="search"
                    className="border border-gray-400 rounded-md relative w-[90px]"
                    placeholder="search"
                  ></input>
                  <button className="inline relative h-full mr-2">
                    <i className="fa-solid fa-magnifying-glass absolute right-1 h-fit bottom-[10px]"></i>
                  </button>
                </form>
                <div className="flex items-center">
                  <CartIcon />
                  <span className="text-md ml-2 font-bold">Cart</span>
                </div>
                <div className="cursor-pointer">
                  {isAuthenticated ? (
                    <NavLink to="/profile">
                      <UserIcon />
                    </NavLink>
                  ) : (
                    <NavLink to="/login" className="capitalize">
                      Login
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </li>
      </ul>
    </nav>
  );
}
