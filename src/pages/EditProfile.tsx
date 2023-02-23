import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  View,
  FlatList,
} from "react-native";
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";


function EditProfilePage() {
  const Bye = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const emailShow = useAuthStore((state) => state.profile.username.email);
  const nameShow = useAuthStore((state) => state.profile.username.name);
  const lastName = useAuthStore((state) => state.profile.username.last_Name);


  const [password, setText1] = useState("");
  const [name, setText2] = useState("");
  const [last_Name, setText3] = useState("");

  const changePassword = async () => {
    return axios.put(`/updatepassword/${emailShow}`, {
   
      password: password,
     
    });
    
  };

  const changeNameandLast = async () => {
    return axios.put(`/update/${emailShow}`, {
        name: name,
        last_Name: last_Name,
    });
  };

  return (
    <SafeAreaView>
      <Text>Perfil</Text>
      <Text>Nombre </Text>
      <TextInput
        placeholder={nameShow}
        onChangeText={setText2}
        value={name}
        style={styles.input}
      />
      <Text>Apellido </Text>
      <TextInput
        placeholder={lastName}
        onChangeText={setText3}
        value={last_Name}
        style={styles.input}
      />
      <Text>Email </Text>
      <TextInput
        placeholder={emailShow}
        style={styles.input}
        disableFullscreenUI
      />
      <Text>password </Text>
      <TextInput
        placeholder="********"
        onChangeText={setText1}
        value={password}
        style={styles.input}
      />
      <Button title="Editar Perfil"   onPress={() => {
          changeNameandLast(), navigate("/profile");
        }} />
      <Button title="Cambiar Contraseña" onPress={() => {
        changePassword(), navigate("/login");
        }} />
      <Button
        title="Logout"
        onPress={() => {
          Bye(), navigate("/login");
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,

    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
});
export default EditProfilePage;
