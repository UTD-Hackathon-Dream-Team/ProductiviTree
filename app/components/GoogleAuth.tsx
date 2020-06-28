//Source for google auth: https://docs.expo.io/versions/latest/sdk/google/

import React, { useState, useEffect } from 'react';
import { TouchableOpacity , Image } from 'react-native';
import { Container, Content, Text, Button , Thumbnail } from "native-base";
import * as Google from "expo-google-app-auth";

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID , ANDROID_APK_CLIENT_ID , IOS_APP_CLIENT_ID} from "../config";

const axios = require("axios").default;

const GoogleAuth = ({navigate} : { navigate: any}) => {

    const newProfile = async (user) => {
        //Creating  a user object to enter in database
        const newUser = {
            googleID: user.id,
            Username: user.name,
            ProfilePic: user.photoUrl,
            Email: user.email
        };

        //console.log("New user", newUser);
        
        //Check if user already exists in database
        await axios
        .get(`https://productivitree.wl.r.appspot.com/api/v1/users/${newUser.googleID}`)
        .then(function (response) {
            console.log("User already exists");
        })
        .catch(function (error) {
            //If user does not exist, add in database
            if (error.response.status === 404){
                console.log("User does not exist");
                axios
                .post("https://productivitree.wl.r.appspot.com/api/v1/users", newUser)
                .then(function (response) {
                    console.log("User added");
                })
                .catch(function (error) {
                    console.log("Error in adding user", error.response);
                });
            }
            else{
                console.log("Error in getting user", error);
            }
        })
        .then(function () {});
      };

    const signInWithGoogle = async () => {
        try {
            //Log in with Google
            const LogInResult = await Google.logInAsync({
              iosClientId: IOS_CLIENT_ID,
              androidClientId: ANDROID_CLIENT_ID,
              androidStandaloneAppClientId: ANDROID_APK_CLIENT_ID,
              iosStandaloneAppClientId: IOS_APP_CLIENT_ID,
              scopes: ["profile", "email"],
            });
      
            //If login was successful, create a new profile and then go navigate to MainStack(Bottom Nav)
            if (LogInResult.type === "success") {
              //console.log("Logged in", LogInResult.user);
              newProfile(LogInResult.user);
              navigate.navigate('MainStack');
              return LogInResult.accessToken;
            } else {
              return { cancelled: true };
            }
          } catch (e) {
            console.log("Error with login", e);
            return { error: true };
          }
    };

    return (
        <Content>
            <TouchableOpacity onPress={signInWithGoogle}>
                <Image
                    source={require('../assets/google_sign_in.png')}
                    //Image from Google's branding guidlines
                    //https://developers.google.com/identity/branding-guidelines
                />
            </TouchableOpacity>
        </Content>
    );
}

export default GoogleAuth;
