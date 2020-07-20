import React, { useState, useEffect, useContext } from "react";
import { Container, Content, Text, View, Button, Image } from "native-base";
import { ScrollView, RefreshControl, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthContext";

const axios = require("axios").default;

const UserList = (props) => {
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
        //props.navigation.navigate( {FriendProfile(user.googleID)} )
    }

    return (
        <View>
            {
                user && 
                <TouchableOpacity onPress={goToUser}>
                    <Text>{user.Username}</Text>
                </TouchableOpacity>
            }
        </View>
    );
};

export default UserList;
