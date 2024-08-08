import { Navigate } from "react-router-dom";
import { useAuthStatus } from "../misc/customHooks";
import { LoginPage } from "../pages/login";

export function ProtectedRoute() {
  const isAuthenticated = useAuthStatus();
  console.log(isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }
  return <LoginPage />;
}
