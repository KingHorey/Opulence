import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./output.css";
import { Provider } from "react-redux";
import Store from "./stateManagement/store/cartStore.tsx";
// import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { Auth0Provider } from "@auth0/auth0-react";

const cartStore = Store();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-pa4py6ehaa0pxag0.us.auth0.com"
      clientId="r4fUif4QezMPEHVpUyAvRKORP4OIvmyT"
      authorizationParams={{
        redirect_uri: "http://localhost:5173",
      }}
    >
      <Provider store={cartStore}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
