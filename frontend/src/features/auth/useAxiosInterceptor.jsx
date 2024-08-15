import { useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "./authReducer"; // Import your logout action
import { API_URL } from "../../utils/constant";
import { useEffect } from "react";

const useAxiosInterceptors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Request interceptor to add Authorization header
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token expiration
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token has expired or is invalid
          dispatch(logout()); // Dispatch the logout action
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors when the component unmounts
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch]);
};

export default useAxiosInterceptors;
