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
  TouchableOpacity,
} from "react-native";
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";
import { TextInput, IconButton } from "@react-native-material/core";

function EditProfilePage({ navigation }: { navigation: any }) {
  const emailShow = useAuthStore((state) => state.profile.username.email);
  const nameShow = useAuthStore((state) => state.profile.username.name);
  const lastName = useAuthStore((state) => state.profile.username.last_Name);
  const bioShow = useAuthStore((state) => state.profile.username.biography);

  const [password, setText1] = useState("");
  const [name, setText2] = useState("");
  const [last_Name, setText3] = useState("");
  const [biography, setText4] = useState("");

  const changePassword = async () => {
    return axios.put(`/updatepassword/${emailShow}`, {
      password: password,
    });
  };

  const changeNameandLast = async () => {
    return axios.put(`/update/${emailShow}`, {
      name: name,
      last_Name: last_Name,
      biography: biography,
    });
  };

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 90,
          borderWidth: 4,
          margin: 10,
        }}
      >
        <View style={{ paddingHorizontal: 25, paddingTop: 100 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "500",
              color: "#333",
              paddingBottom: 25,
            }}
          >
            Editar perfil
          </Text>

          <TextInput
            color="#066cb4"
            label="Nombre"
            placeholder={nameShow}
            onChangeText={setText2}
            value={name}
          />

          <TextInput
            color="#066cb4"
            label="Apellido"
            placeholder={lastName}
            onChangeText={setText3}
            value={last_Name}
          />

          <TextInput
            color="#066cb4"
            label="Email"
            placeholder={emailShow}
            disableFullscreenUI
          />

          <TextInput
            color="#066cb4"
            label="Bio"
            placeholder={bioShow}
            onChangeText={setText4}
            value={biography}
            disableFullscreenUI
          />

          <TextInput
            color="#066cb4"
            label="Contraseña"
            placeholder="******"
            value={password}
          />
        </View>

        <View
          style={{ paddingHorizontal: 70, paddingVertical: 5, paddingTop: 20 }}
        >
          <TouchableOpacity
            onPress={() => {
              changeNameandLast(), navigation.navigate("Profile");
            }}
            style={{
              backgroundColor: "#000000",
              padding: 20,
              borderRadius: 10,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: 16,
                color: "#fff",
              }}
            >
              Editar datos
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{ paddingHorizontal: 70, paddingVertical: 5, paddingTop: 0 }}
        >
          <TouchableOpacity
            onPress={() => {
              changePassword(), navigation.navigate("Profile");
            }}
            style={{
              backgroundColor: "#000000",
              padding: 20,
              borderRadius: 10,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: 16,
                color: "#fff",
              }}
            >
              Editar contraseña
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default EditProfilePage;
