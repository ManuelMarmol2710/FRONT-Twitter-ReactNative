import axios from "../libs/axios";
import { Alert } from "react-native";

export const loginRequest = async (username: string, password: string) => {
  return axios.post("/login", {
    username,
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
  last_Name: string,
  username: string,
  biography: string,
  navigation:any,
) => {
  if (password.length < 7) {
    Alert.alert("Registro Invalido", "Contraseña invalida, debe tener por lo menos 7 caracteres.", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  } else if (username.length < 3) {
    Alert.alert("Registro Invalido", "Usuario invalido, debe tener por lo menos 3 caracteres", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  } else if (password === null && username === null) {
    Alert.alert("Registro Invalido", "Varios campos se encuentran vacios.", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  } else {
    Alert.alert("Registro exitoso.", "Bienvenido", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
    navigation.navigate("login")
    return axios.post("/register", {
      email,
      username,
      biography,
      password,
      name,
      last_Name
    });
  }
};

export const sendTweet = async (tweets: string, email: string) => {
  return axios.post(`tweet/${email}`, {
    tweets,
  });
};

export const getTweet = async (email: string) => {
  await axios.get(`tweet/${email}`);
};
