import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  View,
  FlatList
} from "react-native";


function AwayProfile({navigation}) {
  
  const [taskUser, setTaskUser] = useState([]);
  return (
        <SafeAreaView>
              <Text>Profile</Text>
              <View>
    <FlatList
      data={taskUser}
      renderItem={({ item }) => {
        return (
          <Text>Co
          </Text>
          
        );
      }}
    />
  </View>;
         
        </SafeAreaView>
      );
}
export default AwayProfile;
