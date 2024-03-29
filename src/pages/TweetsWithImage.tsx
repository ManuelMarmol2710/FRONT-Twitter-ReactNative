import { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Pressable,
  Image
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "../libs/axios";
import { useAuthStore } from "../store/auth.store";
import { TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function TweetsWithImage({ route, navigation }: { route: any; navigation: any }) {
  const { owner, tweets, time, _id, name, last_Name, biography, url } = route.params;

  const username = useAuthStore((state) => state.profile.username.username);
  const [like, setLike] = useState(0);
  const [isLike, setisLike] = useState(false);
  const [comment, setText] = useState("");
  const [task, setTask] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [countLike, setCount] = useState([]);
  const commentsPress = async () => {
    setText("");
    return axios.post(`comment/${_id}/${username}`, {
      comment,
    });
  };
  const getComments = async () => {
    await axios.get(`comment/${_id}`).then((response) => {
      setTask(response.data);
    });
  };
  const getCountLike = async () => {
    await axios.get(`/countLike/${_id}`).then((response) => {
      setCount(response.data);
    });
  };

  const onClick = async () => {
    if (like + (!isLike ? -1 : 1)) {
      await axios.post(`/like/${_id}/${username}`).then((response) => {
        setLike(like + (isLike ? -1 : 1));
        getCountLike();
      });
    } else if (like + (isLike ? -1 : 1)) {
      await axios.delete(`/notlike/${username}/${_id}`).then((response) => {
        setLike(like + (!isLike ? -1 : 1));
        getCountLike();
      });
    }
  };

  const obtenerLike = async () => {
    await axios.get(`/like/${username}/${_id}`).then((response) => {
      if (response.data.like === true) {
        setLike(like + (isLike ? -1 : 1));
      }
      if (response.data.like === false) {
        setisLike(!isLike);
      }
    });
  };
  useEffect(() => {
    obtenerLike();
    getComments();
    getCountLike();
  }, []);

  const OnRefresh = useCallback(async () => {
    setRefreshing(true);
    await getComments(), setRefreshing(false);
    await getCountLike(), setRefreshing(false);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />
        }
      >
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
              paddingTop: 10,
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
            <TouchableOpacity
            onPress={() =>
              navigation.navigate("awayprofile", {
                username: owner,
                name: name,
                last_Name: last_Name,
                biography: biography,
              })
            }
              style={{paddingTop:10,
              }}
            >
              <Text
                style={{
                  paddingTop: 20,
                  paddingLeft: 20,
                  textAlign: "left",
                  fontWeight: "700",
                  margin: 1,
                  fontSize: 16,
                  color: "#000000",
                }}
                
              >
                @{owner}:
              </Text>
            </TouchableOpacity>

            <Text>
              {"\n"}
              {"\n"}
            </Text>

            <Text
              style={{
                paddingTop: 28,
                paddingLeft: 100,
                paddingRight: 60,
                textAlign: "left",
                fontSize: 14,
              }}
            >{tweets} {"\n"}
              {"\n"}
              {"\n"}
            </Text>

            <View style={{ paddingLeft: 45, paddingTop: 5 }}>
                        <Image
                          style={{
                            width: 300,
                            height: 300,
                            borderColor: "#000000",
                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${url}` }}
                        />
                      </View>

            <Text
              style={{
                paddingTop: 40,
                paddingLeft: 80,
                paddingRight: 60,
                textAlign: "right",
                fontSize: 14,
              }}
            >
              {" "}
              {"\n"}
              {"\n"}
              || Subido el: {time}
            </Text>
          </Text>

          <TouchableOpacity
            style={{
              paddingHorizontal: 0,
              paddingTop: 0,
              backgroundColor: "#fff",
              borderRadius: 70,
              borderWidth: 3,
              margin: 120,
              marginTop: 10,
              marginBottom: 35,
            }}
          >
            <View style={{ paddingLeft: 2 }}>
              <Pressable
                style={{ paddingLeft: 55, paddingTop: 20, paddingBottom: 0 }}
                onPress={onClick}
              >
                <MaterialCommunityIcons
                  name={like ? "heart" : "heart-outline"}
                  size={32}
                  color={like ? "red" : "black"}
                />
                <Text
                  style={{
                    paddingVertical: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: 15,
                    marginLeft: -14,
                    marginBottom: 10,
                    textAlign: "left",
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                  onPress={() =>
                    navigation.navigate("showLikes", {
                      id_tweet: _id,
                      owner: owner,
                    })
                  }
                >
                  {" "}
                  Likes: {"" + (isLike ? like : countLike)}
                </Text>
              </Pressable>
            </View>
          </TouchableOpacity>

          <View style={{ borderRadius: 10, borderWidth: 3, paddingTop: 5 }}>
            <Text
              style={{
                textAlign: "left",
                fontSize: 30,
                fontWeight: "500",
                color: "#333",
                paddingBottom: 25,
                paddingLeft: 10,
                paddingTop: 5,
              }}
            >
              <Icon
                style={{ padding: 12, textAlign: "left" }}
                name="reply"
                color="#000000"
                size={35}
              />
              Comentarios:
            </Text>

            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 50,
                margin: 10,
                borderWidth: 4,
              }}
            >
              <View style={{ paddingHorizontal: 25, paddingTop: 0 }}>
                <TextInput
                  color="#066cb4"
                  placeholder="Agregar comentario al Tweet"
                  onChangeText={(text) => setText(text)}
                  style={{ paddingHorizontal: 30, paddingVertical: 20 }}
                  value={comment}
                  numberOfLines={4}
                  maxLength={120}
                  editable
                />

                <View style={{ paddingHorizontal: 200, paddingVertical: 1 }}>
                  <TouchableOpacity
                    onPress={commentsPress}
                    style={{
                      backgroundColor: "#000000",
                      padding: 10,
                      borderRadius: 10,
                      marginBottom: 30,
                      marginLeft: -30,
                      marginRight: -70,
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
            </View>

            <FlatList
              data={task}
              renderItem={({ item }) => {
                if (username === item["owner"]) {
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#afc7d8",
                        paddingTop: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingBottom: 10,
                      }}
                      onPress={() =>
                        navigation.navigate("owncomment", {
                          comment: item["comment"],
                          owner: item["owner"],
                          time: item["time"],
                          _id: item["_id"],
                        })
                      }
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
                          <Icon
                            style={{ padding: 10, textAlign: "left" }}
                            name="reply"
                            color="#000000"
                            size={25}
                          />
                          @{item["owner"]}:{" "}
                          <Icon
                            style={{ padding: 10, textAlign: "left" }}
                            name="brush"
                            color="#000000"
                            size={25}
                          />{" "}
                          {"\n"}
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
                          {item["comment"]} {"\n"}
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
                          || Subido el: {item["time"]}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#afc7d8",
                        paddingTop: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingBottom: 10,
                      }}
                      onPress={() =>
                        navigation.navigate("awaycomment", {
                          comment: item["comment"],
                          owner: item["owner"],
                          time: item["time"],
                          _id: item["_id"],
                        })
                      }
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
                          <Icon
                            style={{ padding: 10, textAlign: "left" }}
                            name="reply"
                            color="#000000"
                            size={25}
                          />
                          @{item["owner"]}: {"\n"}
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
                          {item["comment"]} {"\n"}
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
                          || Subido el: {item["time"]}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  );
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TweetsWithImage;
