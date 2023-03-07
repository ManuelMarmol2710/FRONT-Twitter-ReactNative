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
<Text >{owner}</Text>
<Text>{tweets}</Text>
<Text>{time}</Text>
<Likes/>
</SafeAreaView>

    )
  }
  export default  TweetsPage
  