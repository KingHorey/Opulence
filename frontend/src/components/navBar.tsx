import { CartIcon, UserIcon } from "./svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStatus } from "../misc/customHooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { searchItems } from "../types";
import { axiosConfig } from "../misc/axiosConfig";

export function NavBar(): JSX.Element {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<searchItems>();
  const cart = useSelector((state: any) => state.cart.cartItems.length);
  const isAuthenticated = useAuthStatus();
  const handleSearch: SubmitHandler<searchItems> = async (data) => {
    try {
      let result = await axiosConfig.get(`/api/products/search/${data.search}`);
      if (result.status === 200) {
        result = result.data;
        navigate(`/shop/results/${data.search}`, {
          state: { searchResults: result, title: data.search },
        });
      }
    } catch {
      console.log("error");
    }
  };
  return (
    <nav className="flex w-full mb-10 mt-2">
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
              Contact
            </NavLink>
          </li>
        </div>
        <div className="flex ml-10">
          <form onSubmit={handleSubmit(handleSearch)} className="mr-3 relative">
            <input
              {...register("search", {
                required: true,
              })}
              type="search"
              className="border border-gray-400 rounded-md   w-40 px-2 relative"
              placeholder="Search by brand"
            ></input>
            <button className="inline absolute h-fit top-0 mr-2  right-0">
              <i className="fa-solid fa-magnifying-glass  h-full w-full mt-1"></i>
            </button>
          </form>
          <div className="relative">
            <NavLink to="/cart">
              <CartIcon />
            </NavLink>
            {cart > 0 && (
              <div className="bg-red-500 text-white rounded-full text-center absolute h-4 w-4 top-0 left-4 font-semibold text-sm float-end">
                <p className="text-sm text-white">{cart}</p>
              </div>
            )}
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
  const { register, handleSubmit } = useForm<searchItems>();
  const cart = useSelector((state: any) => state.cart.cartItems.length);
  const navigate = useNavigate();
  const handleSearch: SubmitHandler<searchItems> = async (data) => {
    try {
      let result = await axiosConfig.get(`/api/products/search/${data.search}`);
      if (result.status === 200) {
        result = result.data;
        navigate(`/shop/results/${data.search}`, {
          state: { searchResults: result, title: data.search },
        });
      }
    } catch {
      console.log("error");
    }
  };

  const [sideBar, showSideBar] = useState(false);
  function handleSideBar() {
    showSideBar(!sideBar);
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
                <form
                  onSubmit={handleSubmit(handleSearch)}
                  className="mr-3 relative"
                >
                  <input
                    {...register("search", {
                      required: true,
                    })}
                    type="search"
                    className="border border-gray-400 rounded-md   w-40 px-2 relative"
                    placeholder="Search by brand"
                  ></input>
                  <button className="inline absolute h-fit top-0 mr-2  right-0">
                    <i className="fa-solid fa-magnifying-glass  h-full w-full mt-1"></i>
                  </button>
                </form>
                <div className="relative">
                  <NavLink to="/cart">
                    <CartIcon />
                  </NavLink>
                  {cart > 0 && (
                    <div className="bg-red-500 text-white rounded-full text-center absolute h-4 w-4 top-0 left-4 font-semibold text-sm float-end">
                      <p className="text-sm text-white">{cart}</p>
                    </div>
                  )}
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
