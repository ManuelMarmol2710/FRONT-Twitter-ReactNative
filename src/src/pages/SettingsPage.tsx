import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  View,
  TouchableOpacity
} from "react-native";
import { useAuthStore } from "../store/auth.store";

function SettingsPage({navigation}: {navigation: any}) {

  const Bye = async() => { 

    Alert.alert('Cerrar sesion?', 'Su sesion sera cerrada', [
      {
        text: 'Cancel',
        onPress: () => navigation.navigate("Settings"),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => navigation.navigate("login")},
    ]);
    
    useAuthStore((state) => state.logout);
    
  }
  

  return (
    <SafeAreaView>

<View style={{paddingHorizontal: 70, paddingVertical: 5, paddingTop: 650}}>
      <TouchableOpacity 
      onPress={() => {
        Bye();
      }}
      style={{
        backgroundColor: '#ff0000',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}>
        <Text
        style={{
          textAlign:'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff'
        }}>
          Logout
        </Text>
      </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
}
export default SettingsPage;