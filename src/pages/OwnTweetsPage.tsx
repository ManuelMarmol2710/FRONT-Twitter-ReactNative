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
function OwnTweetsPage({ route, navigation }: { route: any; navigation: any }) {
  const { owner, tweets, time } = route.params;

  const deleteTweets = async () => {
    await axios.delete(`deleteTweets/${tweets}`).then((response) => {
      navigation.navigate("Profile");
    });
  };

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
              paddingLeft: 80,
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
          
        </Text>

        <View
          style={{
            paddingHorizontal: 210,
            paddingVertical: 1,
            paddingTop: 15,
          }}
        >
          <TouchableOpacity
            onPress={deleteTweets}
            style={{
              backgroundColor: "#d30000",
              padding: 10,
              borderRadius: 10,
              marginBottom: 15,
              marginLeft: -80,
              marginRight: -60,
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
              Eliminar Tweet
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default OwnTweetsPage;
