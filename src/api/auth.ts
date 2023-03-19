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

  var whiteSpaceExp = /^\s+$/; 
  var whiteSpaceBetween = /\s/;

  if ( username.length < 3||  whiteSpaceExp.test(username)||  whiteSpaceBetween.test(username)) {
    Alert.alert("Registro Invalido", "Usuario invalido.", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  } else if(password.length < 7 || whiteSpaceExp.test(password)|| whiteSpaceBetween.test(password)) {
    Alert.alert("Registro Invalido", "Contraseña invalida.", [
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
