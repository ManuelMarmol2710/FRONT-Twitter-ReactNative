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
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { SimpleLineIcons } from '@expo/vector-icons'; 
function EditProfilePage({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView>
      <View
        style={{
          paddingHorizontal: 25,
          paddingTop: 40,
          backgroundColor: "#fff",
          borderRadius: 50,
          borderWidth: 3,
          margin: 10,
          marginTop: 5,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: "500",
            color: "#333",
            paddingBottom: 15,
          }}
        >
          Opciones de perfil{"   "}<Icon
                    style={{ textAlign: "center" }}
                    name="account-edit"
                    color="#000000"
                    size={40}
                  />
        </Text>

        <View
          style={{ paddingHorizontal: 70, paddingVertical: 5, paddingTop: 10 }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProfileUpdateNamelast");
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
              Editar datos{"          "}<Icon
                    style={{ textAlign: "center" }}
                    name="account-edit"
                    color="#fff"
                    size={30}
                  />
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
              Editar contraseña{"          "}<Icon
                    style={{ textAlign: "center" }}
                    name="account-eye"
                    color="#fff"
                    size={30}
                  />
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ paddingHorizontal: 70, paddingVertical: 5, paddingTop: 5, marginBottom: 10 }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProfileUpdateBio");
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
              Editar biografia{"          "}<Icon
                    style={{ textAlign: "center" }}
                    name="account-details"
                    color="#fff"
                    size={30}
                  />
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ paddingHorizontal: 70, paddingVertical: 5, paddingTop: 5, marginBottom: 10 }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("followers");
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
              Ver seguidores{"          "}<Icon
                    style={{ textAlign: "center" }}
                    name="account-arrow-left"
                    color="#fff"
                    size={30}
                  />
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ paddingHorizontal: 70, paddingVertical: 5, paddingTop: 5, marginBottom: 10 }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("following");
            }}
            style={{
              backgroundColor: "#000000",
              padding: 20,
              borderRadius: 10,
              marginBottom: 10,
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
              Ver seguidos{"          "}<Icon
                    style={{ textAlign: "center" }}
                    name="account-arrow-right"
                    color="#fff"
                    size={30}
                  />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default EditProfilePage;
