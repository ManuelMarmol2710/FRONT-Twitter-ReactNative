import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  RefreshControl,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";
import Likes from "../components/likes";

function HomePage({ navigation }: { navigation: any }) {
  const username = useAuthStore((state) => state.profile.username.username);
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

  const OnRefresh = useCallback(async () => {
    setRefreshing(true);
    await tweetsRelease(), setRefreshing(false);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />
        }
      >
        <View>
          <FlatList
            data={task}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("OwnTweets", {
                      owner: item["owner"],
                      tweets: item["tweets"],
                      time: item["time"],
                      _id: item["_id"],
                    })
                  }
                  style={{
                    backgroundColor: "#afc7d8",
                    paddingTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "left",
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#333",
                      paddingTop: 25,
                      paddingBottom: 5,
                      paddingHorizontal: 15,
                      borderColor: "black",
                      borderWidth: 3,
                      borderRadius: 15,
                      backgroundColor: "#fff",
                      overflow: "hidden",
                    }}
                  >
                    <Text
                      style={{
                        paddingTop: 20,
                        paddingLeft: 30,
                        textAlign: "left",
                        fontWeight: "700",
                        fontSize: 16,
                        color: "#000000",
                      }}
                    >
                      @{item["owner"]}: {"\n"}
                      {"\n"}
                    </Text>

                    <Text
                      style={{
                        paddingTop: 20,
                        paddingLeft: 60,
                        paddingRight: 60,
                        textAlign: "left",
                        fontSize: 14,
                      }}
                    >
                      {" "}
                      {item["tweets"]} {"\n"}
                      {"\n"}
                      {"\n"}
                    </Text>

                    <Text
                      style={{
                        paddingTop: 50,
                        paddingLeft: 60,
                        paddingRight: 60,
                        textAlign: "right",
                        fontSize: 14,
                      }}
                    >
                      {" "}
                      || Subido el: {item["time"]}
                    </Text>
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default HomePage;
