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
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useAuthStore } from "../store/auth.store";
import { IconButton } from "@react-native-material/core";
import axios from "../libs/axios";

function NewTweetPage({ navigation }: { navigation: any }) {
  const username = useAuthStore((state) => state.profile.username.username);

  const [tweets, setText] = React.useState("");

  const tweetsPress = async () => {
    setText("");
    return axios.post(`tweet/${username}`, {
      tweets,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              paddingHorizontal: 25,
              paddingTop: 80,
              backgroundColor: "#fff",
              borderRadius: 50,
              borderWidth: 3,
              margin: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "500",
                color: "#333",
                paddingBottom: 25,
              }}
            >
              Nuevo tweet
            </Text>

            <TextInput
              style={{
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#000000",
                overflow: "hidden",
                height: 120,
                width: 335,
              }}
              color="#000000"
              label="Tweet"
              placeholder="Dile al mundo lo que piensas..."
              onChangeText={(text) => setText(text)}
              value={tweets}
              disableFullscreenUI
              multiline
              maxLength={120}
              editable
            />

            <View style={{ paddingHorizontal: 200, paddingVertical: 1, paddingTop:10 }}>
              <TouchableOpacity
                onPress={tweetsPress}
                style={{
                  backgroundColor: "#000000",
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 30,
                  marginLeft: -20,
                  marginRight: -100,
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
