//Source for google auth: https://docs.expo.io/versions/latest/sdk/google/
//Source for context: https://github.com/ReshmiCode/mern-app/blob/master/src/user/pages/Auth.js

import React, { useContext } from "react";
import { TouchableOpacity, Image } from "react-native";
import { Content, Button, Text } from "native-base";
import * as Google from "expo-google-app-auth";
import { AuthContext } from "../AuthContext";

import {
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  ANDROID_APK_CLIENT_ID,
  IOS_APP_CLIENT_ID,
} from "../config";

const GoogleLogOut = (props) => {
  const auth = useContext(AuthContext);

  const signOutWithGoogle = async () => {
    //reset context
    console.log("Logging out");
    try {
      console.log(auth.accesstoken);
      const { type, accessToken, user } = await Google.logOutAsync({
        accessToken: auth.accesstoken,
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        androidStandaloneAppClientId: ANDROID_APK_CLIENT_ID,
        iosStandaloneAppClientId: IOS_APP_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (type === "success" || type === "default") {
        console.log("Logged out", user);
        auth.logout();
        //props.navigate("LogIn");
        props.navigate.popToTop();
        return accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("Error with logout", e);
      return { error: true };
    }
  };

  return (
    <Content>
      <Button
        style={{ justifyContent: "center", alignItems: "center" }}
        onPress={signOutWithGoogle}
      >
        <Text>Sign Out</Text>
      </Button>
    </Content>
  );
};

export default GoogleLogOut;
