import axios from "../libs/axios";

export const loginRequest = async (email: string, password: string) => {
  return axios.post("/login", {
    email,
    password,
  });
};

export const PerfilRequest = async () => {
  return axios.get("/profile");
};
export const RegisterRequest = async (
  email: string,
  password: string,
  name: string,
  last_Name: string
) => {
  return axios.post("/register", {
    email,
    password,
    name,
    last_Name,
  });
};

export const sendTweet = async (tweets: string, email: string) => {
  return axios.post(`tweet/${email}`, {
    tweets,
  });
};

export const getTweet = async (email: string) => {
  await axios.get(`tweet/${email}`);
};
