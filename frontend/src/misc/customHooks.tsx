import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

export function useAuthStatus() {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated;
}
