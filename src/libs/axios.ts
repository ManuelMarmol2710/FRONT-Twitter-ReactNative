import axios from "axios";
import { useAuthStore } from "../store/auth.store";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.DOMAIN
    : "https://back-twitter-reactnative-production.up.railway.app/";

const authApi = axios.create({
  baseURL,
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  config.headers['Authorization']=  `Bearer ${token}` 
  return config;
});



export default authApi;
