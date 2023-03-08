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
} from "react-native";

import { useAuthStore } from "../store/auth.store";
import { TextInput, IconButton } from "@react-native-material/core";
import axios from "../libs/axios";
import Tweets from "../components/Tweets";

function NewTweetPage({ navigation }: { navigation: any }) {
  const username = useAuthStore((state) => state.profile.username.username);
  const email = useAuthStore((state) => state.profile.username.email);
  const name = useAuthStore((state) => state.profile.username.name);
  const lastName = useAuthStore((state) => state.profile.username.last_Name);
  const biography = useAuthStore((state) => state.profile.username.biography);
  const [tweets, setText] = React.useState("");

  const tweetsPress = async () => {
    setText('');
    return axios.post(`tweet/${username}`, {
      tweets,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ paddingHorizontal: 25, paddingTop: 250 }}></View>

        <TextInput
          color="#066cb4"
          placeholder="Dile al mundo lo que piensas..."
          onChangeText={(text) => setText(text)}
          style={{ paddingHorizontal: 30, paddingVertical: 20 }}
          value={tweets}
          numberOfLines={4}
          maxLength={120}
          editable
          multiline
        />

        <View style={{ paddingHorizontal: 200, paddingVertical: 1 }}>
          <TouchableOpacity
            onPress={tweetsPress}
            style={{
              backgroundColor: "#066cb4",
              padding: 10,
              borderRadius: 10,
              marginBottom: 30,
              marginLeft: -80,
              marginRight: -60
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 95,
    height: 95,
    borderRadius: 55,
  },
  info: {
    marginLeft: 25,
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

export default NewTweetPage;
