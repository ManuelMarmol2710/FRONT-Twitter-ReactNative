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
} from "react-native";
import axios from "../libs/axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
function AwayComments({ route }: { route: any }) {
  const { owner, comment, time, _id } = route.params;
  const [like, setLike] = useState(0);
  const [isLike, setisLike] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const getComments = async () => {};

  useEffect(() => {
    obtenerLikeComments();
  }, []);
  const OnRefresh = useCallback(async () => {
    setRefreshing(true);
    await getComments(), setRefreshing(false);
  }, []);
  return (
    <SafeAreaView>
      <View>
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
                {comment} {"\n"}
                {"\n"}
                {"\n"}
              </Text>
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
                || Subido el: {time} 
                
               
              </Text>
            </Text>

            <View
              style={{
                paddingHorizontal: 210,
                paddingVertical: 1,
                paddingTop: 15,
              }}
            ></View>
          </View>
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
              style={{ paddingLeft: 70, paddingTop: 20, paddingBottom: 0 }}
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default AwayComments;
