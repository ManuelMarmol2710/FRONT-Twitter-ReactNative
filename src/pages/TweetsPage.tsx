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
} from "react-native";
import Likes from "../components/likes";
import axios from "../libs/axios";
function TweetsPage({ route, navigation }: { route: any; navigation: any }) {
  const { owner, tweets, time } = route.params;
  return (
    <SafeAreaView>
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
            @{owner}: {"\n"}
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
            {tweets} {"\n"}
            {"\n"}
            {"\n"}
          </Text>

          <Text
            style={{
              paddingTop: 10,
              paddingLeft: 60,
              paddingRight: 30,
              textAlign: "right",
              fontSize: 12,
            }}
          >
            || Subido el: {time}
          </Text>
        </Text>

        <View style={{paddingLeft: 30, paddingTop:10, borderRadius: 20}}>
          <Likes/>
        </View>
        
      </View>
    </SafeAreaView>
  );
}
export default TweetsPage;
