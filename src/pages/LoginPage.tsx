import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";

import { TextInput, IconButton} from "@react-native-material/core";
import { loginRequest, PerfilRequest } from "../api/auth";
import { useAuthStore } from "../store/auth.store";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


function LoginPage({navigation}: {navigation: any}) {

  const setToken = useAuthStore((state) => state.setToken);
  const [seePassword, setseePassword] = useState(true);
  const setProfile = useAuthStore((state) => state.setProfile);
  const [username, setText] = useState("");
  const [password, setText1] = useState("");
  
  const loginPress = async () => {

    try {

      const respuesta = await loginRequest(username, password);
      setToken(respuesta.data.token);
      const resProfile = await PerfilRequest();
      setProfile(resProfile.data.profile);
      navigation.navigate('homepage')

    } catch (error) {

      Alert.alert('Login Invalido', 'Usuario o contraseña', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ])

      console.log(error);

    }

  };

    const createTwoButtonAlert1 = async() => {
      Alert.alert('Alert Title', 'My Alert Msg', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ])

      console.log(createTwoButtonAlert1);

      }



  const register = async() => {
  navigation.navigate('register')
  }

  const recoverEmail = async() => {
    navigation.navigate('sendEmail')

  }
  return (
    <SafeAreaView>
      <View style={{paddingHorizontal:25, paddingTop:150}}>
      <Text style={{
            textAlign:'center',
            fontSize: 30,
            fontWeight: '500',
            color: '#333',
            paddingBottom:25
          }}>
        Iniciar sesion
      </Text>

      <View> 
      <TextInput
        color='#066cb4'
        label="Usuario"
        placeholder="user1"
        onChangeText={setText}
        value={username}
        style={{ margin: 16 }}
      />
      </View>

      <TextInput
        color='#066cb4'
        label="Password"
        secureTextEntry={seePassword}
        trailing={props => (
          <IconButton onPress={() => setseePassword(!seePassword)} icon={props => <Icon name="eye" {...props} />} {...props} />
        )}
        placeholder="Password"
        onChangeText={setText1}
        value={password}
        style={{ margin: 16 }}
      />

      </View>

      <View style={{paddingHorizontal: 70, paddingVertical: 5}}>
      <TouchableOpacity 
      onPress={loginPress}
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
          Login
        </Text>
      </TouchableOpacity>
      </View>

      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Olvido su contraseña?</Text>
          <TouchableOpacity onPress={recoverEmail}>
            <Text style={{color: '#000000', fontWeight: '700'}}> Haga click aqui</Text>
          </TouchableOpacity>
        </View>

      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>No tienes una cuenta?</Text>
          <TouchableOpacity onPress={register}>
            <Text style={{color: '#000000', fontWeight: '700'}}> Registrate</Text>
          </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
});

export default LoginPage;
