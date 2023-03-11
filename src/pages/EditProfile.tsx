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
  TouchableOpacity
} from "react-native";

function EditProfilePage({navigation}: {navigation: any}) {
  return (
    <SafeAreaView>
      <View
        style={{ paddingHorizontal: 70, paddingVertical: 5, paddingTop: 25 }}
      >
        <TouchableOpacity
          onPress={() => {
          navigation.navigate("ProfileUpdateNamelast");
          }}
          style={{
            backgroundColor: "#066cb4",
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
            Editar Nombre y Apellido
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ paddingHorizontal: 70, paddingVertical: 5, paddingTop: 5 }}
      >
        <TouchableOpacity
          onPress={() => {
           navigation.navigate("ProfileUpdatePassword");
          }}
          style={{
            backgroundColor: "#066cb4",
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
    </SafeAreaView>
  );
}
export default EditProfilePage;

