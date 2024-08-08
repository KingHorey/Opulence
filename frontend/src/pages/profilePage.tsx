import { PageContainer } from "../components/pageContainer";
import { DisplaySideBarContent, SideBar } from "../components/sideBar";
import { NavLink, Outlet } from "react-router-dom";
import ResponsiveNavBar from "../components/responsiveNavBar";

export function Profile() {
  return (
    <PageContainer>
      <ResponsiveNavBar />
      <div className="w-full flex md:flex-row xxs:flex-col h-screen bg-[#FFFFFF]">
        <SideBar>
          <div className="rounded-sm duration-200  hover:bg-[#f1f1f2]">
            <NavLink
              to="/profile/personal-info"
              className={({ isActive }) => {
                return isActive
                  ? "w-full lg:text-xl xxs:text-xs  bg-gray-300 p-1 inline-block rounded-md"
                  : "w-full lg:text-xl xxs:text-xs inline-block p-1";
              }}
            >
              Personal Information
            </NavLink>
          </div>
          <div className=" rounded-sm duration-200 hover:bg-[#f1f1f2]">
            <NavLink
              to="/profile/my-orders"
              className={({ isActive }) => {
                return isActive
                  ? "w-full lg:text-xl xxs:text-xs  bg-gray-300  inline-block rounded-md"
                  : "w-full lg:text-xl xxs:text-xs inline-block p-1";
              }}
            >
              My Orders
            </NavLink>
          </div>
          <div className="rounded-sm duration-200  hover:bg-[#f1f1f2]">
            <NavLink
              to="/profile/saved-items"
              className={({ isActive }) => {
                return isActive
                  ? "w-full lg:text-xl xxs:text-xs  bg-gray-300 p-1 inline-block rounded-md"
                  : "w-full lg:text-xl xxs:text-xs inline-block p-1";
              }}
            >
              Saved Items
            </NavLink>
          </div>
          <div className="rounded-sm duration-200  hover:bg-[#f1f1f2]">
            <NavLink
              to="/profile/my-reviews"
              className={({ isActive }) => {
                return isActive
                  ? "w-full lg:text-xl xxs:text-xs  bg-gray-300 p-1 inline-block rounded-md"
                  : "w-full lg:text-xl xxs:text-xs inline-block p-1";
              }}
            >
              Reviews
            </NavLink>
          </div>
          <div>
            <form action="">
              <button></button>
            </form>
          </div>
        </SideBar>
        <DisplaySideBarContent>
          <Outlet />
        </DisplaySideBarContent>
      </div>
    </PageContainer>
  );
}
