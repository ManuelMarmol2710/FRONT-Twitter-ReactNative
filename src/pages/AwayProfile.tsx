import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  View,
  FlatList,
} from "react-native";
import axios from "../libs/axios";
import Tweets from "../components/Tweets";
function AwayProfile(
  { route }: { route: any },
  { navigation }: { navigation: any }
) {
  const { email, name, last_Name } = route.params;
  const [task, setTask] = useState([]);

  const showTweetsProfilenotmine = async () => {
    await axios.get(`tweet/${email}`).then((response) => {
      setTask(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    showTweetsProfilenotmine();
  }, []);
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <View>
        <Text>Correo:{email}</Text>
        <Text>Nombre:{name}</Text>
        <Text>Apellido:{last_Name}</Text>
      </View>
      <View>
        <Tweets task={task} />
      </View>
    </SafeAreaView>
  );
}
export default AwayProfile;
