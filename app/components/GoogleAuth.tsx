//Source for google auth: https://docs.expo.io/versions/latest/sdk/google/

import React, { useState, useEffect } from 'react';
import { TouchableOpacity , Image } from 'react-native';
import { Container, Content, Text, Button , Thumbnail } from "native-base";
import * as Google from "expo-google-app-auth";

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID , ANDROID_APK_CLIENT_ID , IOS_APP_CLIENT_ID} from "../config";

const GoogleAuth = ({navigate} : { navigate: any}) => {

    const signInWithGoogle = async () => {
        try {
            const LogInResult = await Google.logInAsync({
              iosClientId: IOS_CLIENT_ID,
              androidClientId: ANDROID_CLIENT_ID,
              androidStandaloneAppClientId: ANDROID_APK_CLIENT_ID,
              iosStandaloneAppClientId: IOS_APP_CLIENT_ID,
              scopes: ["profile", "email"],
            });
      
            if (LogInResult.type === "success") {
              console.log("Logged in", LogInResult.user);
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
