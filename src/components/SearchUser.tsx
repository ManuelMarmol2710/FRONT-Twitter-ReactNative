import React from "react";
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

function SearchUser({ taskUser }) {
  return (
   <View>
   <FlatList
     data={taskUser}
     renderItem={({ item }) => {
       return (
         <Text>
           {item.email}
         </Text>
       );
     }}
   />
 </View>
);
};

export default SearchUser;
