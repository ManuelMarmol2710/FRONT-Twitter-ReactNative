import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { RegisterRequest, PerfilRequest } from "../api/auth";
import { useAuthStore } from "../store/auth.store";
import {useNavigate} from 'react-router-dom'
function RegisterPage() {
  const [email, setText] = useState("");
  const [password, setText1] = useState("");
  const [name, setText2] = useState("");
  const [last_Name, setText3] = useState("");
  const setToken = useAuthStore((state) => state.setToken);

  const setProfile = useAuthStore((state) => state.setProfile);
  const navigate = useNavigate()  
  

  const SignupPress = async () => {
    const respuesta = await RegisterRequest(email, password,name,last_Name);
    setToken(respuesta.data.token);

    const resProfile = await PerfilRequest();

    setProfile(resProfile.data.profile);

    navigate("/home");
  };

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
        onChangeText={setText}
        value={email}
        style={styles.input}
      />
      <Text>password </Text>
      <TextInput
        placeholder="********"
        onChangeText={setText1}
        value={password}
        style={styles.input}
      />

      <Button title="Register" onPress={SignupPress} />
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
});

export default RegisterPage;
