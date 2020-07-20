import React, { useState, useEffect, useContext } from "react";
import { Container, Content, Text, View, Button, Image , Card, CardItem, Left, Body, Thumbnail} from "native-base";
import { ScrollView, RefreshControl, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthContext";

const axios = require("axios").default;

const UserList = (props) => {
    const auth = useContext(AuthContext);
    let [user, setUser] = useState(null);

    async function fetchData() {
        const result = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/users/${props.user}`
        );
        setUser(result.data.payload);
    }

    useEffect(() => {
        fetchData();
        console.log(user);
    }, []);

    function goToUser() {
        console.log("User Page Here");
        console.log("User", user.googleID);
        console.log("You", auth.googleID);
        console.log( (user.googleID) == ((auth.googleID).toString()) );
        //props.navigation.navigate( {FriendProfile(user.googleID)} )
    }

    return (
        <Card style={{ borderRadius: 1000}}>
            <TouchableOpacity onPress={goToUser}>
                <CardItem>
                <Left>
                    <Thumbnail
                        source={{
                        uri: user.ProfilePic,
                        }}
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 30,
                        }}
                    />
                    <Body>
                        <Text>{user.Username}</Text>
                    </Body>
                </Left>
                </CardItem>
            </TouchableOpacity>
        </Card>
    );
};

export default UserList;
