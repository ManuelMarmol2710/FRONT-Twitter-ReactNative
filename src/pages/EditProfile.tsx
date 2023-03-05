import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  Alert,
  View,
  FlatList,
} from "react-native";
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";
import { TextInput, IconButton} from "@react-native-material/core";

function EditProfilePage({navigation}: {navigation: any}) {
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
      <View style={{paddingHorizontal:25, paddingTop:150}}>
      <Text style={{
            textAlign:'center',
            fontSize: 30,
            fontWeight: '500',
            color: '#333',
            paddingBottom: 25
          }}>
        Editar perfil
      </Text>

      <TextInput
        color='#066cb4'
        label="Nombre"
        placeholder={nameShow}
        onChangeText={setText2}
        value={name}
      />

      <TextInput
        color='#066cb4'
        label="Apellido"
        placeholder={lastName}
        onChangeText={setText3}
        value={last_Name}
      />
  
      <TextInput
        color='#066cb4'
        label="Email"
        placeholder={emailShow}
        disableFullscreenUI
      />

      <TextInput
        color='#066cb4'
        label="Contraseña"
        placeholder="******"
        value={password}
      />
      </View>

<View style={{paddingHorizontal:25, paddingTop:50}}>
      <Button
        title="Cambiar Nombre"
        onPress={() => {
          changeNameandLast(), navigation.navigate("/profile");
        }}
      />
      <Button
        title="Cambiar Contraseña"
        onPress={() => {
          changePassword(), navigation.navigate("login");
        }}
      />

        <Button
        title="Atras"
        onPress={() => navigation.navigate("profile")}
      />

      </View>
    </SafeAreaView>
  );
}
export default EditProfilePage;
