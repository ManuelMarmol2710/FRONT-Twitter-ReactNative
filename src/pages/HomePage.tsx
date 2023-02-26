import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  View,
} from "react-native";
import { useAuthStore } from "../store/auth.store";
function HomePage({navigation}: {navigation: any}) {
  const Bye = useAuthStore((state) => state.logout);
  const buscar = async () => {
    navigation.navigate('buscar');
  };
  const profile = async () => {
    navigation.navigate('profile');
  };

  return (
    <SafeAreaView>
      <Text>HOME</Text>
      <Button title="Buscar" onPress={buscar} />
      <Button title="Profile" onPress={profile} />
      <Button
        title="Logout"
        onPress={() => {
          Bye(), navigation.navigate("login");
        }}
      />
    </SafeAreaView>
  );
}
export default HomePage;
