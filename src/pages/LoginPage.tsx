import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { loginRequest, PerfilRequest } from "../api/auth";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const setToken = useAuthStore((state) => state.setToken);

  const setProfile = useAuthStore((state) => state.setProfile);
  const navigation = useNavigate();

   const [email, setText] = useState("");
  const [password, setText1] = useState("");

  const loginPress = async () => {
    const respuesta = await loginRequest(email, password);
    setToken(respuesta.data.token);

    const resProfile = await PerfilRequest();
    setProfile(resProfile.data.profile);

    navigation('/home');
  };

  return (
    <SafeAreaView>
      <Text>Email </Text>
      <TextInput
        placeholder="ejemplo@gmail.com"
        onChangeText={setText}
        value={email}
        style={styles.input}
      />
      <Text>password </Text>
      <TextInput
        placeholder="ejemplo@gmail.com"
        onChangeText={setText1}
        value={password}
        style={styles.input}
      />
      <Button title="Login" onPress={loginPress} />
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

export default LoginPage;
