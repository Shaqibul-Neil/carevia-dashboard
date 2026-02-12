import axios from "axios";
import { useEffect, useMemo } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const useAxiosSecure = () => {
  //take the token and logout form authContext
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  //create axios instance using use memo to prevent unnecessary recreation
  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }, []); //empty dependency - only once create

  useEffect(() => {
    // Add a request interceptor to attach token for every api call
    const requestInterceptors = axiosSecure.interceptors.request.use(
      (config) => {
        // if token available attach it to Authorization Header
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        //  request error then reject
        return Promise.reject(error);
      },
    );

    // response interceptor : error handle after api response
    const responseInterceptors = axiosSecure.interceptors.response.use(
      (response) => {
        // success response just return
        return response;
      },
      (error) => {
        // error response handling
        const status = error.response?.status;

        //if 401(unauthorized) or 403(forbidden)
        if (status === 401 || status === 403) {
          logout();
          navigate("/login", { replace: true });
        }
        return Promise.reject(error);
      },
    );
    //clean up : when component unmounts remove interceptors to prevent memory leak
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptors);
      axiosSecure.interceptors.response.eject(responseInterceptors);
    };
  }, [token, logout, navigate, axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
