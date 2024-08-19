import axios from "axios";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "https://acadamicfolios.pythonanywhere.com/app";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async req => {
    // If authTokens are not present, no need to process further
    if (!authTokens) {
      return req;
    }

    // Decode JWT token to check its expiration
    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    // If the token is not expired, proceed with the request
    if (!isExpired) return req;

    // If the token is expired, try refreshing it
    try {
      const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: authTokens.refresh
      });

      // Update the authTokens and user context
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));

      // Store the new tokens in localStorage
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      // Update the request's Authorization header with the new access token
      req.headers.Authorization = `Bearer ${response.data.access}`;

    } catch (error) {
      console.error("Failed to refresh token:", error);
      // Handle token refresh failure, possibly clear tokens or redirect to login
      setAuthTokens(null);
      setUser(null);
      localStorage.removeItem("authTokens");
    }

    return req;
  });

  return axiosInstance;
};

export default useAxios;