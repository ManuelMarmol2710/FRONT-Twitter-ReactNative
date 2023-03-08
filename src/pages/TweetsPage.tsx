import { useState,useEffect,useCallback } from "react";
import {
  SafeAreaView,
  Text,
ScrollView,

  View,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "../libs/axios";
import { useAuthStore } from "../store/auth.store";
import { TextInput, IconButton } from "@react-native-material/core";

function OwnTweetsPage({ route, navigation }: { route: any; navigation: any }) {
  const { owner, tweets, time, _id } = route.params;
  const username = useAuthStore((state) => state.profile.username.username);
  const [like,setLike] = useState(0)
  const [isLike,setisLike] = useState(false)
  const [comment, setText] = useState("");
  const [task, setTask] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const commentsPress = async () => {
    setText('');
    return axios.post(`comment/${_id}/${username}`, {
      comment,
    });
  };
  const getComments = async () => {
await axios.get(`comment/${_id}`).then((response) => {
      setTask(response.data);
    });
  
  
  };
  const onClickComment =  async() => {
   if((like +(!isLike ? -1: 1))){
     
        await axios.get(`comment/${_id}`).then(async (response) => {
          const idComentario = response.data._id
          console.log(idComentario)
          await axios.put(`/likeComment/${idComentario}/${owner}`).then(async (response) => {
        setLike(like +(isLike ? -1 : 1));
      });})
    } else if((like +(isLike ? -1: 1))){
      await axios.put(`/notlikeComment/${_id}`).then((response) => {
     
        setLike(like +(!isLike ? -1 : 1));
       });
       
  }}
  const onClick =  async() => {
    if((like +(!isLike ? -1: 1))){
       await axios.put(`/like/${_id}/${owner}`).then((response) => {
       setLike(like +(isLike ? -1 : 1));
         })
     } else if((like +(isLike ? -1: 1))){
       await axios.put(`/notlike/${_id}`).then((response) => {
      
         setLike(like +(!isLike ? -1 : 1));
        });
   }}
  const obtenerLike = async() => {
    await axios.get(`/like/${_id}`).then((response) => {
  if(response.data.like === true){
    setLike(like +(isLike ? -1 : 1));
  } if(response.data.like === false){
    setisLike(!isLike);
  }
    });}

    const obtenerLikeComments = async() => {
      await axios.get(`/likeComment/${_id}`).then((response) => {
    if(response.data.like === true){
      setLike(like +(isLike ? -1 : 1));
    } if(response.data.like === false){
      setisLike(!isLike);
    }
    
    });
    
    }
  
  useEffect(() => {
   obtenerLike();
getComments();

  
  },[])
  

  const OnRefresh = useCallback(async () => {
    setRefreshing(true);
    await getComments(), setRefreshing(false);
  }, []);

  return (
    <SafeAreaView>
       <ScrollView  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />
        }>
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
          <Pressable onPress={onClick}>
       <MaterialCommunityIcons
        name={like ? "heart" : "heart-outline"}
        size={32}
        color={like? "red" : "black"}
      />
      <Text >{"" + (isLike ? like :"")} </Text>
    </Pressable>
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
            {time} {"\n"}
            {"\n"}
            {"\n"}
          </Text>
        </Text>

      
        <View style={{ paddingHorizontal: 25, paddingTop:10 }}></View>

<TextInput
  color="#066cb4"
  placeholder="Agregar comentario al Tweet"
  onChangeText={(text) => setText(text)}
  style={{ paddingHorizontal: 30, paddingVertical: 20 }}
  value={comment}
  numberOfLines={4}
  maxLength={120}
  editable
  multiline
/>

<View style={{ paddingHorizontal: 200, paddingVertical: 1 }}>
  <TouchableOpacity
    onPress={commentsPress}
    style={{
      backgroundColor: "#066cb4",
      padding: 10,
      borderRadius: 10,
      marginBottom: 30,
      marginLeft: -80,
      marginRight: -60
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
      Comentar
    </Text>
  </TouchableOpacity>
      
  </View>
  
 
  </View>     
 <View>
   
            <FlatList
              data={task}
              renderItem={({ item }) => {
                return (
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
                        @{item.owner}: {"\n"}
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
                        {item.comment} {"\n"}
                        {"\n"}
                        {"\n"}
                      </Text>

                      <Text
                        style={{
                          paddingTop: 50,
                          paddingLeft: 60,
                          paddingRight: 60,
                          textAlign: "right",
                          fontSize: 14,
                        }}
                      >
       

 
                        {" "}
                        || Subido el: {item.time}
                      </Text>
                    </Text>
                  </View>
                );
              }}
            />
         </View>
         </ScrollView>
      
    </SafeAreaView>
  );
}
  
export default OwnTweetsPage;
