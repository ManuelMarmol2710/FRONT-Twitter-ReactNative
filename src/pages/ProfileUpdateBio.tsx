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
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";
import { TextInput, IconButton} from "@react-native-material/core";

function ProfileUpdateBiografia({navigation}: {navigation: any}) {
  const emailShow = useAuthStore((state) => state.profile.username.email);
  const nameShow = useAuthStore((state) => state.profile.username.name);
  const lastName = useAuthStore((state) => state.profile.username.last_Name);
  const bioShow = useAuthStore((state) => state.profile.username.biography);

  const [biography, setText4] = useState("");

  const changeBio = async () => {
    return axios.put(`/updatebiography/${emailShow}`, {
   biography: biography,
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
        Editar Biografia
      </Text>

     
      <TextInput
        color='#066cb4'
        label="Biografia"
        placeholder={bioShow}
        onChangeText={setText4}
        value={biography}
        disableFullscreenUI

      />
</View>
  
      <View
        style={{ paddingHorizontal: 70, paddingVertical: 5, paddingTop: 25 }}
      >
        <TouchableOpacity
          onPress={() => {
           changeBio(),  navigation.navigate("Profile");
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
            Editar
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ paddingHorizontal: 70, paddingVertical: 5, paddingTop: 5 }}
      >
        
      </View>
    </SafeAreaView>
  );
}
export default ProfileUpdateBiografia;
