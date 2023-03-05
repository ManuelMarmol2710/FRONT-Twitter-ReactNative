import React, { useState, useEffect, useCallback} from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  View,
  FlatList,
  RefreshControl
} from "react-native";
import { useAuthStore } from "../store/auth.store";

import axios from "../libs/axios";


function Tweets() {
  const username = useAuthStore((state) => state.profile.username.username)
  const [task, setTask] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const tweetsRelease = async () => {
    await axios.get(`tweet/${username}`).then((response) => {
      setTask(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    tweetsRelease();
  }, []);

  const OnRefresh = useCallback(async ()=> {
setRefreshing(true);
    await tweetsRelease(),
   setRefreshing(false); 
  },[]);
 
  return (
    <View>
      <FlatList
        data={task}
        renderItem={({ item }) => {
          return (
            <Text>
              {item.owner}
              {item.tweets}
              {item.time}
            </Text>
          );
          
        }}
        refreshControl ={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={OnRefresh}
          />
        }
      />
    
    </View>
  );
}
export default Tweets;
