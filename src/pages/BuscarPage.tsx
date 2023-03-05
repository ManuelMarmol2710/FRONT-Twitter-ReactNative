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

function BuscarPage({ navigation }: { navigation: any }) {
  const [search, setSearch] = React.useState("");
  const [task, setTask] = useState([]);
  const [taskUser, setTaskUser] = useState([]);
  const tweetsFind = async () => {
    await axios.get(`/tweetSearch/${search}`).then((response) => {
      setTask(response.data);
    });
  };

  const userFind = async () => {
    await axios.get(`/userSearch/${search}`).then((response) => {
      setTaskUser(response.data);
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
        onChangeText={(text) => setSearch(text)}
        value={search}
        style={styles.input}
        numberOfLines={4}
        maxLength={40}
        editable
        multiline
      />

      <Tweets />
      <View>
        <FlatList
          data={taskUser}
          renderItem={({ item }) => {
            return (
              <Text
                onPress={() =>
                  navigation.navigate("awayprofile", {
                    username: item.username,
                    name: item.name,
                    last_Name: item.last_Name,
                    biography: item.biography
                  })
                }
              >
                {item.username}
                
              </Text>
            );
          }}
        />

<Button
        title="Atras"
        onPress={() => navigation.navigate("homepage")}
      />
      </View>
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
