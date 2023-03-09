import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    SafeAreaView,
    Text, View,
    ScrollView,
    RefreshControl,
    Pressable,
    TouchableOpacity,
} from "react-native";
import axios from "../libs/axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "@react-native-material/core";
function OwnComments({ route, navigation }: { route: any, navigation: any }) {
    const { owner, comments, time, _id } = route.params;
    const [like, setLike] = useState(0)
    const [isLike, setisLike] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
const [comment, setcomments] = useState('')
    const onClick = async () => {
        if ((like + (!isLike ? -1 : 1))) {
            await axios.put(`/likeComment/${_id}/${owner}`).then((response) => {
                setLike(like + (isLike ? -1 : 1));
            })
        } else if ((like + (isLike ? -1 : 1))) {
            await axios.put(`/notlikeComment/${_id}`).then((response) => {

                setLike(like + (!isLike ? -1 : 1));
            });
        }
    }
    const obtenerLikeComments = async () => {
        await axios.get(`/likeComment/${_id}`).then((response) => {
            if (response.data.like === true) {
                setLike(like + (isLike ? -1 : 1));
            } if (response.data.like === false) {
                setisLike(!isLike);
            }

        });

    }


    const actuComment = async () => {
        await axios.put(`/updateComment/${_id}`).then((response) => {
            setcomments(response.data.comment)
            console.log(response.data.comment)
            console.log(_id)
        });
    }
    const deleteComment = async () => {
        await axios.delete(`deleteComment/${_id}`).then(async (response) => {
            navigation.navigate("Buscar");
        });
    };

    useEffect(() => {
        obtenerLikeComments();



    }, [])
    const OnRefresh = useCallback(async () => {
        setRefreshing(true);
        await actuComment(),setRefreshing(false);
    }, []);
    return (
        <SafeAreaView>
            <ScrollView refreshControl={
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

                        <TextInput
                            style={{
                                paddingTop: 20,
                                paddingLeft: 10,
                                paddingRight: 100,
                                textAlign: "left",
                                fontWeight: "700",
                                fontSize: 16,
                                color: "#000000",
                               
                            }}     onChangeText={(text)=> setcomments(text)} value = {comment}    >
                            
                         
                            
                        </TextInput>



                        <Pressable onPress={onClick}>
                            <MaterialCommunityIcons
                                name={like ? "heart" : "heart-outline"}
                                size={32}
                                color={like ? "red" : "black"}
                            />
                            <Text >{"" + (isLike ? like : "")} </Text>
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
                            Actualizar Comentario
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
                        onPress={deleteComment}
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
                            Eliminar Comentario
                        </Text>
                    </TouchableOpacity>
                </View>


               

            </ScrollView>
        </SafeAreaView >
    )
}

export default OwnComments;