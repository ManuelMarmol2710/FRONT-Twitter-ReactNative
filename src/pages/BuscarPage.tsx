import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  Alert,
  View,
  FlatList,
} from "react-native";

import axios from "../libs/axios";
import Tweets from "../components/Tweets";
import { TextInput, IconButton} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

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
        color='#066cb4'
        trailing={props => (
          <IconButton icon={props => <Icon name="magnify" {...props} />} {...props} />
        )}
        onChangeText={(text) => setSearch(text)}
        value={search}
        style={{ margin: 10 }}
        numberOfLines={1}
        maxLength={40}
        editable
        multiline
      />

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
