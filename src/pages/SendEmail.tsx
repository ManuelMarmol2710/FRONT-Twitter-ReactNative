import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
 
} from "react-native";

import axios from "../libs/axios";

function SendEmailPage({navigation}) {
    const [email, setText] = useState("");

  
  const sendemail = async () => {
    return axios.post(`sendEmail/${email}`, {
      message: "Enviado al correo"
    });
  };

  return (
        <SafeAreaView>
             <Text>Escriba su correo para recuperar su contraseña </Text>
      <TextInput
        placeholder="ejemplo@gmail.com"
        onChangeText={setText}
        value={email}
        style={styles.input}
      /> 
          <Button title="Enviar contraseña al correo"  onPress={() => {
          sendemail(), navigation.navigate("/login");
        }} />
        
        </SafeAreaView>
      );
}
const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
export default SendEmailPage;