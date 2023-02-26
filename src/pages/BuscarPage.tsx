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
import SearchUser from "../components/SearchUser";
function BuscarPage({ navigation }) {
  const [search, setText] = React.useState("");
  const [task, setTask] = useState([]);
  const [taskUser, setTaskUser] = useState([]);
  const tweetsFind = async () => {
    await axios.get(`/tweetSearch/${search}`).then((response) => {
      setTask(response.data);
      console.log(response.data);
    });
  };

  const userFind = async () => {
    await axios.get(`/userSearch/${search}`).then((response) => {
      setTaskUser(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    userFind();
    tweetsFind();
  }, [search]);

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Buscador"
        onChangeText={(text) => setText(text)}
        value={search}
        style={styles.input}
        numberOfLines={4}
        maxLength={40}
        editable
        multiline
      />

      <Tweets task={task} />
      <SearchUser taskUser={taskUser} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,

    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
});
export default BuscarPage;
