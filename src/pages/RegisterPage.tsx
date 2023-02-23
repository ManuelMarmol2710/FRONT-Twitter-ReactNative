import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RegisterRequest, PerfilRequest } from "../api/auth";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [email, setText] = useState("");
  const [password, setText1] = useState("");
  const [name, setText2] = useState("");
  const [last_Name, setText3] = useState("");
  const [seePassword, setseePassword] = useState(true);
  const [checkValidEmail, setcheckValidEmail] = useState(true);

  const setToken = useAuthStore((state) => state.setToken);
  const setProfile = useAuthStore((state) => state.setProfile);

  const navigate = useNavigate();

  const SignupPress = async () => {
    const respuesta = await RegisterRequest(email, password, name, last_Name);
    setToken(respuesta.data.token);

    const resProfile = await PerfilRequest();

    setProfile(resProfile.data.profile);

    navigate("/login");
  };
  const volver = async () => {
    navigate("/login");
  };

  const checkPasswordValidity = (value: any) => {
 
    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return 'Password must be 8-16 Characters Long.';
    }
  }

  const handleCheckEmail = (text: any) => {
    let re = /\S+@\S+\.\S+/;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setText(text);
    
if (re.test(text) || reg.test(text)) {
      setcheckValidEmail(false);
    } else {
      setcheckValidEmail(true);
    }
  };

  const handleLogin = () => {
const checkpassword = checkPasswordValidity(password)

if(!checkpassword) {
 
  alert("sucess")

  } else {

    alert("login failed")
  }
  }
  return (
    <SafeAreaView>
      <Text>Nombre </Text>
      <TextInput
        placeholder="Nombre"
        onChangeText={setText2}
        value={name}
        style={styles.input}
      />
      <Text>Apellido </Text>
      <TextInput
        placeholder="Apellido"
        onChangeText={setText3}
        value={last_Name}
        style={styles.input}
      />
      <Text>Email </Text>
      <TextInput
        placeholder="ejemplo@gmail.com"
        onChangeText={(text) => handleCheckEmail(text)}
        value={email}
        style={styles.input}
      />
      <Text>password </Text>
      <TextInput
        placeholder="********"
        onChangeText={(text) => setText1(text)}
        value={password}
        style={styles.input}
        secureTextEntry={seePassword}
      />
      <TouchableOpacity
        style={styles.wrapperIcon}
        onPress={() => setseePassword(!seePassword)}
      >
        <Image
          source={
            seePassword
              ? require("../images/Eye.png")
              : require("../images/EyeActive.png")
          }
          style={styles.icon}
        />
      </TouchableOpacity>

      <Button
        disabled={checkValidEmail}
   
        title="Register"
        onPress={SignupPress}
      />

      <Button title="Volver" onPress={volver} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  wrapperIcon: {
    position: "absolute",
    right: -260,
    padding: 287,
  },
  icon: {
    width: 30,
    height: 24,
  },
});

export default RegisterPage;
