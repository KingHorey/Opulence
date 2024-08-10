import { PageContainer } from "../components/pageContainer";
import { DisplaySideBarContent, SideBar } from "../components/sideBar";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import ResponsiveNavBar from "../components/responsiveNavBar";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";

export function Profile() {
  const authAdmin: { isAdmin: boolean } | null = useAuthUser();
  const adminState = authAdmin?.isAdmin;
  const signOut = useSignOut();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <ResponsiveNavBar />
      <div className="w-full flex md:flex-row xxs:flex-col  bg-[#FFFFFF]">
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
            {adminState ? (
              <NavLink
                to="/profile/orders"
                className={({ isActive }) => {
                  return isActive
                    ? "w-full lg:text-xl xxs:text-xs  bg-gray-300 p-1 inline-block rounded-md"
                    : "w-full lg:text-xl xxs:text-xs inline-block p-1";
                }}
              >
                All Orders
              </NavLink>
            ) : (
              <NavLink
                to="/profile/orders"
                className={({ isActive }) => {
                  return isActive
                    ? "w-full lg:text-xl xxs:text-xs  bg-gray-300 p-1 inline-block rounded-md"
                    : "w-full lg:text-xl xxs:text-xs inline-block p-1";
                }}
              >
                My Orders
              </NavLink>
            )}
          </div>
          <div className="rounded-sm duration-200  hover:bg-[#f1f1f2]">
            {adminState ? (
              <NavLink
                to="/profile/add-product"
                className={({ isActive }) => {
                  return isActive
                    ? "w-full lg:text-xl xxs:text-xs  bg-gray-300 p-1 inline-block rounded-md"
                    : "w-full lg:text-xl xxs:text-xs inline-block p-1";
                }}
              >
                Add Item
              </NavLink>
            ) : (
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
            )}
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
          <div className="rounded-sm duration-200 hover:bg-[#f1f1f2]">
            {adminState && (
              <NavLink
                to="/profile/add-brand"
                className={({ isActive }) => {
                  return isActive
                    ? "w-full lg:text-xl xxs:text-xs  bg-gray-300 p-1 inline-block rounded-md"
                    : "w-full lg:text-xl xxs:text-xs inline-block p-1";
                }}
              >
                Add Brands
              </NavLink>
            )}
          </div>
          <div className="mt-auto mb-10">
            <button
              className="text-red-500 hover:bg-red-500 p-1 w-full hover:text-slate-50 transition-all duration-500 text-left rounded-sm"
              onClick={() => {
                signOut();
                return navigate("/home");
              }}
            >
              Sign Out
            </button>
          </div>
        </SideBar>
        <DisplaySideBarContent>
          <Outlet />
        </DisplaySideBarContent>
      </div>
    </PageContainer>
  );
}
