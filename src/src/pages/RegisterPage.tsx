import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RegisterRequest, PerfilRequest } from "../api/auth";
import { useAuthStore } from "../store/auth.store";
import { TextInput, IconButton} from "@react-native-material/core";

function RegisterPage({navigation}: {navigation: any}) {
  const [email, setText] = useState("");
  const [password, setText1] = useState("");
  const [name, setText2] = useState("");
  const [last_Name, setText3] = useState("");
  const [biography, setText4] = useState("");
  const [username, setText5] = useState("");
  const [seePassword, setseePassword] = useState(true);
  const [checkValidEmail, setcheckValidEmail] = useState(true);

  const setToken = useAuthStore((state) => state.setToken);
  const setProfile = useAuthStore((state) => state.setProfile);
  const SignupPress = async () => {
    const respuesta = await RegisterRequest(email, password, name, last_Name,username,biography);
    setToken(respuesta.data.token);

    if (password.length < 7) {
      Alert.alert('Registro Invalido', 'Contraseña invalida', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ])
  } else if (email == null || username == null || name == null || last_Name == null){
    Alert.alert('Registro Invalido', 'Campo vacio', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ])

  } else {
    navigation.navigate("login");
  }
  };
 

  const checkPasswordValidity = (value: any) => {
 
    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return 'La contraseña debe tener entre 8 y 16 caracteres.';
    }
  }

  const handleCheckEmail = (text: any) => {
    let re = /\S+@\S+\.\S+/;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setText(text);
    
if (re.test(text) || reg.test(text)) {
      setcheckValidEmail(false);
    } else {
      setcheckValidEmail(true);
    }
  };

const handleLogin = () => {
const checkpassword = checkPasswordValidity(password)

if(!checkpassword) {
 
  alert("success")

  } else {

    alert("login failed")
  }
  }
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
        Registro de usuario
      </Text>

      <TextInput
        color='#066cb4'
        label="Nombre"
        placeholder="Nombre"
        onChangeText={setText2}
        value={name}
      />
  
      <TextInput
        color='#066cb4'
        label="Apellido"
        placeholder="Apellido"
        onChangeText={setText3}
        value={last_Name}
      />
       
       <TextInput
        color='#066cb4'
        label="Biografia"
        placeholder="Hola mi usuario es..."
        onChangeText={(text) => setText4(text)}
        value={biography}
      />

      <TextInput
        color='#066cb4'
        label="Email"
        placeholder="ejemplo@test.com"
        onChangeText={(text) => handleCheckEmail(text)}
        value={email}
      />
  <TextInput
        color='#066cb4'
        label="Usuario"
        placeholder="Nombre de Usuario"
        onChangeText={setText5}
        value={username}
      />

      <TextInput
        color='#066cb4'
        label="Contraseña"
        placeholder="Contraseña"
        onChangeText={(text) => setText1(text)}
        value={password}
      />
      
      </View>

      <View style={{paddingHorizontal: 70, paddingVertical: 5, paddingTop:25}}>
      <TouchableOpacity
      disabled={checkValidEmail} 
      onPress={SignupPress}
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
          Registrar
        </Text>
      </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
});

export default RegisterPage;