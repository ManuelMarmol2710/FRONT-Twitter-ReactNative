import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  View, 
  TouchableOpacity
} from "react-native";
import { TextInput, IconButton} from "@react-native-material/core";
import axios from "../libs/axios";

function SendEmailPage({navigation}: {navigation: any}) {
    const [email, setText] = useState("");

  
  const sendemail = async () => {
    navigation.navigate("login")
    return axios.post(`sendEmail/${email}`, {
      message: "Enviado al correo"
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
          }}>Escriba su correo para recuperar su contraseña 
          </Text>

      <View> 
      <TextInput
        color='#066cb4'
        label="Email"
        placeholder="Ejemplo@test.com"
        onChangeText={setText}
        value={email}
        style={{ margin: 16 }}
      />
      </View>
          </View>

          <View style={{paddingHorizontal: 70, paddingVertical: 5}}>
      <TouchableOpacity 
      onPress={sendemail}
      style={{
        backgroundColor: '#066cb4',
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
          Recuperar Contraseña
        </Text>
      </TouchableOpacity>
      </View>


        </SafeAreaView>
      );
}
const styles = StyleSheet.create({
    
  });
export default SendEmailPage;
