import { useSelector } from "react-redux";

export function useAuth() {
  const { user, token } = useSelector((state) => state.auth);
  return { user, token, isAuthenticated: !!token };
}
