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
  RefreshControl
} from "react-native";
import Likes from "../components/likes";
import axios from "../libs/axios";
function TweetsPage(
  { route, navigation }: { route: any, navigation: any }
) {
  const { owner,tweets,time } = route.params;
  return(
<SafeAreaView>
  <View style={{backgroundColor: "#fff",
    paddingTop: 10,}}>
<Text style={{
          paddingTop: 30,
          paddingLeft: 30,
          textAlign: "left",
          fontWeight: "700",
          fontSize: 16,
          color: "#000000",
        }}>@{owner}
        </Text>
<Text style={{
          paddingTop: 20,
          paddingLeft: 60,
          paddingRight: 60,
          textAlign: "left",
          fontSize: 14,
        }}>{tweets}</Text>
<Text style={{
          paddingTop: 30,
          paddingLeft: 60,
          paddingRight: 30,
          textAlign: "right",
          fontSize: 12,
        }}>{time}</Text>
<View style={{ paddingHorizontal: 50, paddingTop: 45 }}>
        <Likes />
      </View>
      </View>
</SafeAreaView>

  )
}
export default  TweetsPage

