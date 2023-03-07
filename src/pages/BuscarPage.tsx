import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  Alert,
  View,
  FlatList,
  NativeEventEmitter,
  ScrollView
} from "react-native";

import { SelectList } from 'react-native-dropdown-select-list'
import axios from "../libs/axios";
import { TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function BuscarPage({ navigation }: { navigation: any }) {
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const [task, setTask] = useState([]);
  const [taskUser, setTaskUser] = useState([]);

   const userFind = async () => {
    await axios.get(`/userSearch/${search}`).then((response) => {
      setTaskUser(response.data);
    });
  };

  const tweetsFind = async () => {
    await axios.get(`/tweetSearch/${search}`).then((response) => {
      setTask(response.data);
    });
  };


  const filtrartweetsOld = async () => {
    await axios.get(`/tweetsFilterForOld/${search}`).then((response) => {
      setTask(response.data);
    });
  }
  const filtrartweetsNew = async () => {
    await axios.get(`/tweetsFilterForNew/${search}`).then((response) => {
      setTask(response.data);
    });
  }

  const data = [
    {key:'1', value:'Fecha descendente', filtrartweetsNew},
    {key:'2', value:'Fecha ascendente', filtrartweetsOld}
]

  useEffect(() => {
    userFind()
    tweetsFind();

  }, [search]);
  
  return (
    <SafeAreaView>
    <ScrollView>
    <View style={{ margin: 10, paddingTop:25 }}>
    <SelectList 
                setSelected={(selected: React.SetStateAction<string>) => setSelected(selected)} 
                data={data} 
                save="value"
                onSelect={filtrartweetsOld}
                searchPlaceholder = "Filtrar por"
            />
    </View>
        

      <TextInput
        color='#066cb4'
        trailing={props => (
          <IconButton icon={props => <Icon name="magnify" {...props} />} {...props} />
        )}
        onChangeText={(text) => setSearch(text)}

        value={search}
        style={{ margin: 10, paddingTop:15 }}
        numberOfLines={2}
        maxLength={40}
        editable
      />

      <View style={{ margin: 20, paddingTop:5 }}>
      <Text style={{
            textAlign:'left',
            fontSize: 24,
            fontWeight: '500',
            color: '#333',
            paddingBottom:25
          }}>
              Usuarios encontrados:
      </Text>
        <FlatList data={taskUser} renderItem={({ item }) => {
          return (
            <Text
              onPress={() =>
                navigation.navigate("awayprofile", {
                  username: item.username,
                  name: item.name,
                  last_Name: item.last_Name,
                  biography: item.biography
                })}>
              @{item.username}</Text>
          )

        }} />
      </View>

      
      <View style={{ margin: 20, paddingTop:0 }}>
        <Text style={{
            textAlign:'left',
            fontSize: 24,
            fontWeight: '500',
            color: '#333',
            paddingBottom:15
          }}> Tweets: </Text>
        <FlatList
          data={task}
          renderItem={({ item }) => {
            return (
              <Text
                onPress={() =>
                  navigation.navigate("showTweets", {
                    owner: item.owner,
                    tweets: item.tweets,
                    time: item.time

                  })
                }
              >
                {item.owner}: {item.tweets} || {item.time}

              </Text>
            );
          }}
        />

      </View>
      </ScrollView>
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