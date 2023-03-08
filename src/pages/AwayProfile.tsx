import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";

import axios from "../libs/axios";
function AwayProfile({ navigation, route }: { navigation: any; route: any }) {
  const { username, name, last_Name, biography } = route.params;
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
        <View style={{ paddingLeft: 5, paddingRight: 5 }}>
          <View style={styles.container}>
            <View
              style={{
                marginTop: 50,
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Image
                style={styles.avatar}
                source={{
                  uri: "data:image/jpeg;base64,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",
                }}
              />
              <View style={styles.info}>
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                  @{username}
                </Text>
                <Text style={styles.username}>
                  {name} {last_Name}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.statLabel}>Tweets</Text>
                <Text style={styles.statValue}>1,234</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.statLabel}>Following</Text>
                <Text style={styles.statValue}>123</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.statLabel}>Followers</Text>
                <Text style={styles.statValue}>456</Text>
              </View>
            </View>
            <Text style={styles.bio}>{biography}</Text>
          </View>
          <View style={{ paddingHorizontal: 25, paddingTop: 30 }}></View>

          <View style={{ paddingTop: 0 }}>
            <FlatList
              data={task}
              renderItem={({ item }) => {
                return (
                  <View
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
                        navigation.navigate("showTweets", {
                          owner: item["owner"],
                          tweets: item["tweets"],
                          time: item["time"],
                          _id: item["_id"],
                        })
                      }
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
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = {
  container: {
    backgroundColor: "#FFFFFF",
    paddingTop: 10,
    borderColor: "#00000",
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderRadius: 20,
  },
  header: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    color: "#999",
    fontSize: 18,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    color: "#999",
    fontSize: 14,
  },
  statValue: {
    fontSize: 18,
  },
  bio: {
    padding: 20,
    fontSize: 16,
    color: "#333",
  },
};
export default AwayProfile;
