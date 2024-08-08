import React, { createContext, useContext, useState } from "react";

export interface contextInterface {
  authStatus: boolean;
  setAuthStatus: (status: boolean) => void;
}

export const context = createContext<contextInterface | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [authStatus, setAuthStatus] = useState<boolean>(false);

  return (
    <context.Provider value={{ authStatus, setAuthStatus }}>
      {children}
    </context.Provider>
  );
};

export const useAppContext = () => {
  const contextValue = useContext(context);
  if (!contextValue) {
    throw new Error("useAppContext must be used within a AppContext.Provider");
  }
  return contextValue;
};

export function loginExpirationCheck() {
  let authStatus = localStorage.getItem("authStatus");
  // let expiry = localStorage.getItem("authStatusExpiry");
  // let new Date()
  if (authStatus) authStatus = JSON.parse(authStatus);
}
