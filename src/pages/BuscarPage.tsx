import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  Alert,
  View,
  FlatList,
  NativeEventEmitter,
  ScrollView,
  RefreshControl,
  LogBox,
  YellowBox,
} from "react-native";
import { useAuthStore } from "../store/auth.store";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "../libs/axios";
import { TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

LogBox.ignoreAllLogs();
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

function BuscarPage({ navigation }: { navigation: any }) {
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const [task, setTask] = useState([]);
  const [taskUser, setTaskUser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const username = useAuthStore((state) => state.profile.username.username);

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
  };
  const filtrartweetsNew = async () => {
    await axios.get(`/tweetsFilterForNew/${search}`).then((response) => {
      setTask(response.data);
    });
  };

  const tweetsRelease = async () => {
    await axios.get(`tweet/${username}`).then((response) => {
      setTask(response.data);
      console.log(response.data);
    });
  };

  const data = [
    { key: "1", value: "Mas reciente", filtrartweetsNew },
    { key: "2", value: "Mas antiguo", filtrartweetsOld },
  ];

  useEffect(() => {
    userFind();
    tweetsFind();
  }, [search]);


  const OnRefresh = useCallback(async () => {
    setRefreshing(true);
    await tweetsRelease(), setRefreshing(false);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />
        }>
        <View style={{ margin: 10, paddingTop: 25 }}>
          <SelectList
            setSelected={(selected: React.SetStateAction<string>) =>
              setSelected(selected)
            }
            data={data}
            save="value"
            onSelect={filtrartweetsOld}
            searchPlaceholder="Filtrar por"
          />
        </View>

        <TextInput
          color="#066cb4"
          trailing={(props) => (
            <IconButton
              icon={(props) => <Icon name="magnify" {...props} />}
              {...props}
            />
          )}
          onChangeText={(text) => setSearch(text)}
          value={search}
          style={{ margin: 10, paddingTop: 15 }}
          numberOfLines={2}
          maxLength={40}
          editable
        />

        <View style={{ margin: 20, paddingTop: 5 }}>
          <Text
            style={{
              textAlign: "left",
              fontSize: 24,
              fontWeight: "500",
              color: "#333",
              paddingBottom: 25,
            }}
          >
            Usuarios encontrados:
          </Text>

          <View>
            <FlatList
              data={taskUser}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      backgroundColor: "#afc7d8",
                      paddingTop: 10,
                      paddingLeft: 10,
                      paddingRight: 160,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "left",
                        fontSize: 16,
                        fontWeight: "500",
                        color: "#333",
                        paddingTop: 25,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingBottom: 5,
                        paddingHorizontal: 10,
                        borderColor: "black",
                        borderWidth: 3,
                        borderRadius: 15,
                        backgroundColor: "#fff",
                        overflow: "hidden",
                      }}
                      onPress={() =>
                        navigation.navigate("awayprofile", {
                          username: item['username'],
                          name: item['name'],
                          last_Name: item['last_Name'],
                          biography: item['biography'],
                        })
                      }
                    >
                      <Text
                        style={{
                          paddingTop: 10,
                          paddingLeft: 30,
                          textAlign: "left",
                          fontWeight: "700",
                          fontSize: 16,
                          color: "#000000",
                        }}
                      >
                        @{item['username']}
                      </Text>
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>

        <View style={{ margin: 20, paddingTop: 0 }}>
          <Text
            style={{
              textAlign: "left",
              fontSize: 24,
              fontWeight: "500",
              color: "#333",
              paddingBottom: 15,
            }}
          >
            {" "}
            Tweets:{" "}
          </Text>
          <FlatList
            data={task}
            renderItem={({ item }) => {
              return (
                <View style={{backgroundColor: "#afc7d8",
                paddingTop: 10, paddingLeft: 5, paddingRight: 5}}>
                <Text
                style={{
                  textAlign: "left",
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#333",
                  paddingTop: 25,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingBottom: 5,
                  paddingHorizontal: 10,
                  borderColor: "black",
                  borderWidth: 3,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                  overflow: 'hidden'
                }}
                  onPress={() =>
                    navigation.navigate("showTweets", {
                      owner: item['owner'],
                      tweets: item['tweets'],
                      time: item['time'],
                      _id: item['_id']
                    })
                  }
                >
                   <Text style={{
                      paddingTop: 20,
                      paddingLeft: 30,
                      textAlign: "left",
                      fontWeight: "700",
                      fontSize: 16,
                      color: "#000000",
                      }}>@{item['owner']}: {'\n'}{'\n'}</Text>
                      
                      <Text style={{
                              paddingTop: 20,
                              paddingLeft: 60,
                              paddingRight: 60,
                              textAlign: "left",
                              fontSize: 14,
                            }}> {item['tweets']} {'\n'}{'\n'}{'\n'}
                            </Text>                      
                         
                    <Text style={{
                              paddingTop: 50,
                              paddingLeft: 60,
                              paddingRight: 60,
                              textAlign: "right",
                              fontSize: 14,
                            }}> || Subido el:  {item['time']}</Text> 
                </Text>
                </View>
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
