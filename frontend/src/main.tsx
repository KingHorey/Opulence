import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./output.css";
import { Provider } from "react-redux";
import Store from "./stateManagement/store/cartStore.tsx";

const cartStore = Store();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={cartStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
