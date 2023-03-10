import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Pressable,
  TouchableOpacity,
  Alert
} from "react-native";
import axios from "../libs/axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function OwnComments({ route, navigation }: { route: any; navigation: any }) {
  const { owner, comment, time, _id } = route.params;
  const [like, setLike] = useState(0);
  const [isLike, setisLike] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [comments, setcomments] = useState("");
  const onClick = async () => {
    if (like + (!isLike ? -1 : 1)) {
      await axios.put(`/likeComment/${_id}/${owner}`).then((response) => {
        setLike(like + (isLike ? -1 : 1));
      });
    } else if (like + (isLike ? -1 : 1)) {
      await axios.put(`/notlikeComment/${_id}`).then((response) => {
        setLike(like + (!isLike ? -1 : 1));
      });
    }
  };
  const obtenerLikeComments = async () => {
    await axios.get(`/likeComment/${_id}`).then((response) => {
      if (response.data.like === true) {
        setLike(like + (isLike ? -1 : 1));
      }
      if (response.data.like === false) {
        setisLike(!isLike);
      }
    });
  };

  const actuComment2 = async () => {
    await axios.put(`/updateComment/${_id}`).then((response) => {
      setcomments(response.data.comment);
      console.log(response.data.comment);
      console.log(_id);
    });
  };

  const deleteComment = async () => {
    Alert.alert("Desea eliminar el comentario?", "Su comentario sera eliminado", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancelado"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () =>
        await axios.delete(`deleteComment/${_id}`).then(async (response) => {
            navigation.navigate("Buscar");
          })
      },
    ]);
  };

  const actuComment = async () => {
    Alert.alert("Desea editar el comentario?", "Su comentario sera editado", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancelado"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () =>
        await axios.put(`/updateComment/${_id}`).then((response) => {
            setcomments(response.data.comment);
            console.log(response.data.comment);
            console.log(_id);
          })
      },
    ]);
  };

  useEffect(() => {
    obtenerLikeComments();
  }, []);
  const OnRefresh = useCallback(async () => {
    setRefreshing(true);
    await actuComment(), setRefreshing(false);
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
            paddingHorizontal: 210,
            paddingVertical: 1,
            paddingTop: 15,
          }}
        >
          <TouchableOpacity
            onPress={deleteComment}
            style={{
              backgroundColor: "#d30000",
              padding: 10,
              borderRadius: 10,
              marginBottom: 15,
              marginLeft: 145,
              marginRight: -190,
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
              <Icon
                style={{ padding: 12, textAlign: "right" }}
                name="delete"
                color="#fff"
                size={25}
              />
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingHorizontal: 210,
            paddingVertical: 1,
            paddingTop: 15,
          }}
        >
          <TouchableOpacity
            onPress={actuComment}
            style={{
              backgroundColor: "#066cb4",
              padding: 10,
              borderRadius: 10,
              marginBottom: 15,
              marginLeft: 145,
              marginRight: -190,
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
              <Icon
                style={{ padding: 12, textAlign: "right" }}
                name="update"
                color="#fff"
                size={25}
              />
            </Text>
          </TouchableOpacity>
        </View>

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
                <Icon
                style={{ padding: 12, textAlign: "left" }}
                name="reply"
                color="#000000"
                size={25}
              />
                <Icon
                style={{ padding: 12, textAlign: "left" }}
                name="brush"
                color="#000000"
                size={25}
              />
              @{owner}: {"\n"}
              {"\n"}
            </Text>

            <TextInput
              style={{
                paddingTop: 30,
                paddingLeft: 10,
                paddingHorizontal: 1
              }}
              onChangeText={(text) => setcomments(text)}
            >
              {""}
              {comment} {"\n"}
              
            </TextInput>
            <Text
              style={{
                paddingTop: 20,
                paddingLeft: 80,
                paddingRight: 60,
                textAlign: "right",
                fontSize: 14,
              }}
            >
              {" "}
              {"\n"}
              {"\n"}
              {"\n"}
              {time} 
            </Text>
          </Text>

          <View
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
            <Pressable
              style={{ paddingLeft: 60, paddingTop: 20, paddingBottom: 0 }}
              onPress={onClick}
            >
              <MaterialCommunityIcons
                name={like ? "heart" : "heart-outline"}
                size={32}
                color={like ? "red" : "black"}
              />
              <Text>{"" + (isLike ? like : "")} </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default OwnComments;
