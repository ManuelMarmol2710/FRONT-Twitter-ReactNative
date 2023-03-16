import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  View,
  TouchableOpacity,
} from "react-native";
import { useAuthStore } from "../store/auth.store";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function SettingsPage({ navigation }: { navigation: any }) {

  const Bye = async () => {
    Alert.alert("Cerrar sesion?", "Su sesion sera cerrada", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancelado"),
        style: "cancel",
      },
      { text: "OK", onPress: () => navigation.navigate("login") },
    ]);
      useAuthStore((state) => state.logout);
  };

  return (
    <SafeAreaView>
      <View
        style={{
          paddingHorizontal: 140,
          paddingVertical: 5,
          paddingTop: 120,
          paddingBottom: 0,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          style={{
            backgroundColor: "#9b9b9b",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
            borderColor: "black",
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderTopWidth: 1,
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontWeight: "700",
              fontSize: 16,
              color: "#fff",
            }}
          >
            Editar Perfil
          </Text>
          <Icon
            style={{ padding: 12, textAlign: "center" }}
            name="brush"
            color="#000000"
            size={50}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingHorizontal: 140,
          paddingVertical: 5,
          paddingTop: 200,
          paddingBottom: 0,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Bye();
          }}
          style={{
            backgroundColor: "#ff0000",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
            borderColor: "black",
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderTopWidth: 1,
            borderBottomWidth: 1,
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
            Logout
          </Text>
          <Icon
            style={{ padding: 12, textAlign: "center" }}
            name="logout"
            color="#000000"
            size={50}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default SettingsPage;
