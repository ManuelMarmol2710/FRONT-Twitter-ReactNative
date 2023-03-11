import React, { useState, useEffect } from "react";
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
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";
import { TextInput, IconButton} from "@react-native-material/core";

function ProfileUpdatePasswordPage({navigation}: {navigation: any}) {
  const emailShow = useAuthStore((state) => state.profile.username.email);
  const [password, setText1] = useState("");
   const changePassword = async () => {
    return axios.put(`/updatepassword/${emailShow}`, {
      password: password,
    });
  };

  return (
    <SafeAreaView>
      <View style={{paddingHorizontal:25, paddingTop:100}}>
      <Text style={{
            textAlign:'center',
            fontSize: 30,
            fontWeight: '500',
            color: '#333',
            paddingBottom: 25
          }}>
        Editar Contraseña
      </Text>
<TextInput
        color='#066cb4'
        label="Contraseña"
        placeholder="******"
        value={password}
        onChangeText={(text)=> setText1(text) }
      />
      </View>
 <View
        style={{ paddingHorizontal: 70, paddingVertical: 5, paddingTop: 5 }}
      >
        <TouchableOpacity
          onPress={() => {
            changePassword(), navigation.navigate("login");
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
            Editar Contraseña
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default ProfileUpdatePasswordPage;
