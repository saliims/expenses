import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "./authReducer";
import { API_URL } from "../../utils/constant";

const AuthStateHandler = ({ children }) => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          const response = await axios.get(`${API_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setUser(response.data));
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          // Handle token expiration or other errors here
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [token, user, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return children;
};
export default AuthStateHandler;
