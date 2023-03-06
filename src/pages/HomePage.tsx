import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  View,
  ScrollView,
  BackHandler,
} from "react-native";
import { useAuthStore } from "../store/auth.store";
import Tweets from "../components/Tweets";


function HomePage({navigation}: {navigation: any}) {

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
            <Tweets/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default HomePage;
