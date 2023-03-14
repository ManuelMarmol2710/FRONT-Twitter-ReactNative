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
  Image,
  ScrollView,
  Platform,
  Keyboard

} from "react-native";
import { firebaseConfig } from "../ImagenFirebase/firebase"
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/auth.store";
import { TextInput, IconButton } from "@react-native-material/core";
import axios from "../libs/axios";
import * as ImagePicker from 'expo-image-picker'
import { firebase } from "../ImagenFirebase/firebase";
import {getDownloadURL, uploadBytes, getStorage, ref} from 'firebase/storage'
function NewTweetPage({ navigation }: { navigation: any }) {
  const username = useAuthStore((state) => state.profile.username.username);
  const [uploading, setUploading] = React.useState(false)
  const [tweets, setText] = React.useState("");
  const [image, setImage] = React.useState(null)
  const [showIm, setShowImg] = React.useState([])

  const tweetsPress = async () => {
    setText("");
    setImage("")
    setUploading(true);
   const response = await fetch(image!)
    const blob = await response.blob();
    const filename = image!.substring(image!.lastIndexOf('/') + 1)
    const app = firebase.initializeApp(firebaseConfig)
    const storage = getStorage(app)
    const storageref = ref(storage,filename)
    await uploadBytes(storageref,blob)
    const url =  await getDownloadURL(storageref)
    console.log(url)
  axios.post(`tweet/${username}`, {
    tweets,
    url
  });
 

  };

  const Upload = async (e: Event) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
    
 setImage(result.assets[0].uri);
   
   } 
 }

  const uploadImage = async () => {
    firebase.firestore().collection('Tweets').add({
    username,
    tweets,
    
   }).then(()=> {
      setText('')
      Keyboard.dismiss();
    })
    .catch((error)=>{
      console.log(error)
      })
   setUploading(false);
  setImage(null);
  
  }
 


  useEffect(() => {
    const foo = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }
    foo();
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
 
        <View
          style={{
            paddingHorizontal: 25,
            paddingTop: 80,
            backgroundColor: "#fff",
            borderRadius: 50,
            borderWidth: 3,
            margin: 10,

          }}
        >
             
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "500",
              color: "#FDFEFE",
              paddingTop: 20,
              paddingBottom: 15,
              backgroundColor: "#85C1E9",
              borderRadius: 50,
              borderWidth: 5,
              borderColor: "#2471A3"
            }}
          >
            Nuevo Tweet
          </Text>

          <TextInput
            style={{
              paddingHorizontal: 10,
              paddingVertical: 20,
              backgroundColor: "#AED6F1",
              borderWidth: 3,
              paddingTop: 20,
              marginBottom: 30,
              marginTop: 30,
              borderColor: "#2980B9",
              borderStyle: 'dashed',

            }
            }
            color="#3498DB"
            placeholder="Dile al mundo lo que piensas..."
            onChangeText={(text) => setText(text)}
            value={tweets}
            numberOfLines={4}
            maxLength={120}
            editable
          />
          <View style={{ paddingHorizontal: 10, paddingVertical: 1, marginBottom: 15, }}>
            {image && <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />}
            <StatusBar style="auto" />

          </View>

          <View style={{ paddingHorizontal: 200, paddingVertical: 1 }}>
            <TouchableOpacity
              onPress={Upload}
              style={{
                backgroundColor: "#3364FF",
                padding: 10,
                borderRadius: 10,
                marginBottom: 30,
                marginLeft: -20,
                marginRight: -100,
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
                Subir Imagen
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 200, paddingVertical: 1 }}>
            <TouchableOpacity
              onPress={tweetsPress}
              style={{
                backgroundColor: "#000000",
                padding: 10,
                borderRadius: 10,
                marginBottom: 30,
                marginLeft: -20,
                marginRight: -100,
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
                Tweetear
              </Text>
            </TouchableOpacity>
          </View>
           </View>


</ScrollView>
</SafeAreaView>
  );
}



export default NewTweetPage;
