import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

function Tweets({ task }: {task:any}) {
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
      />
    </View>
  );
}
export default Tweets;
