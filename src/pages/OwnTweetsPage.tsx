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
  
  import axios from "../libs/axios";
  function OwnTweetsPage(
    { route, navigation }: { route: any, navigation: any }
  ) {
    const { owner,tweets,time } = route.params;
 
    const deleteTweets = async () => {
      await axios.delete(`deleteTweets/${tweets}`).then((response) => {
       navigation.navigate('Profile');
      });
    };
    
    return(
<SafeAreaView>
<Text>{owner}</Text>
<Text>{tweets}</Text>
<Text>{time}</Text>
<View style={{ paddingHorizontal: 210, paddingVertical: 1 }}>
        <TouchableOpacity
          onPress={deleteTweets}
          style={{
            backgroundColor: '#066cb4',
            padding: 10,
            borderRadius: 10,
            marginBottom: 30,
            marginLeft: -175
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16,
              color: '#fff'
            }}>
            Eliminar Tweet
          </Text>
        </TouchableOpacity>
      </View>

</SafeAreaView>

  
)
  }

  export default  OwnTweetsPage
  