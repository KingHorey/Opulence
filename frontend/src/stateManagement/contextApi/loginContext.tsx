import React, { createContext, useContext, useState } from "react";

export interface contextInterface {
  authStatus: boolean;
  adminStatus: boolean;
  setAuthStatus: (status: boolean) => void;
  setAdminStatus: (status: boolean) => void;
}

export const context = createContext<contextInterface | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const [adminStatus, setAdminStatus] = useState<boolean>(false);

  return (
    <context.Provider
      value={{ authStatus, adminStatus, setAdminStatus, setAuthStatus }}
    >
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
