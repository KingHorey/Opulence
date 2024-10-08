import HomePage from "./pages/homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error404 } from "./pages/error404";
import { AppProvider } from "./stateManagement/contextApi/loginContext";
import { ToastContainer } from "react-toastify";
import { RegisterPage } from "./pages/register";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import { ProtectedRoute } from "./components/protectedRoute";
import { Profile } from "./pages/profilePage";
import PersonalInfo from "./pages/personalInfo";
import NewArrivals from "./pages/newArrivals";
import { ContactPage } from "./pages/contactPage";
import { OrdersPage } from "./pages/orders";
import { AddBrandPage } from "./pages/addBrand";
import { AddProduct } from "./pages/addProduct";
import { OAuthSuccess } from "./pages/OAuthSuccess";
import { LoginPage } from "./pages/login";
import Shop from "./pages/Shop";
import { ProductDetails } from "./pages/Products/productDetails";
import { BrandPage } from "./pages/Products/brandPage";
import { CartPage } from "./pages/cartPage";
import { ProductsPage } from "./pages/Products/productsPage";
import { PrivacyPolicy } from "./pages/privacyPolicy";
// import { refreshApi } from "./stateManagement/sessionMgt/refreshMgt";
// import { useAuthStatus } from "./misc/customHooks";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <Error404 />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/home",
      element: <HomePage />,
      errorElement: <Error404 />,
    },
    {
      path: "/login",
      element: (
        <ProtectedRoute>
          <LoginPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/shop",
      element: <Shop />,
    },
    {
      path: "/shop/results/:data",
      element: <ProductsPage />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
    {
      path: "/shop/:name",
      element: <BrandPage />,
    },
    {
      path: "/login/success",
      element: <OAuthSuccess />,
    },
    {
      path: "/register",
      element: (
        <ProtectedRoute>
          <RegisterPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/new-arrivals",
      element: <NewArrivals />,
    },
    {
      path: "/contact-us",
      element: <ContactPage />,
    },
    {
      element: <AuthOutlet fallbackPath="/login" />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
          children: [
            {
              path: "/profile/personal-info",
              element: <PersonalInfo />,
            },
            {
              path: "/profile/orders",
              element: <OrdersPage />,
            },
            {
              path: "/profile/add-brand",
              element: <AddBrandPage />,
            },
            {
              path: "/profile/add-product",
              element: <AddProduct />,
            },
          ],
        },
        {
          path: "/privacy-policy",
          element: <PrivacyPolicy />,
        },
      ],
    },
    {
      path: "/product/:id",
      element: <ProductDetails />,
    },
  ]);

  return (
    // <>

    <AuthProvider store={store}>
      <AppProvider>
        <RouterProvider router={route}></RouterProvider>
      </AppProvider>
      <ToastContainer
        position="top-center"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthProvider>
    // </>
  );
}

export default App;
