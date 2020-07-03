import React, { useContext } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { Container, Content, Text, Button, View } from "native-base";
import { Image } from "react-native";
import Swiper from "react-native-swiper";
import GoogleAuth from "../components/GoogleAuth";
import { AuthContext } from "../AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import logo from "../assets/logo_icon.png";
import tree from "../assets/tree_icon.png";
import study from "../assets/study_icon.png";
import friends from "../assets/friends_icon.png";

var styles = {
  slides: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tagline: {
    flex: 1,
    textAlign: "center",
    fontSize: 32,
    color: "#050932",
    padding: 20,
  },
  icon: {
    flex: 1.5,
    paddingTop: 100,
    resizeMode: "contain",
  },
};

type Props = {
  navigation: StackNavigationProp<any, "LogIn">;
};

const LogIn: React.FC<Props> = ({ navigation }) => {
  const auth = useContext(AuthContext);

  return (
    <LinearGradient
      colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]}
      style={{ flex: 1 }}
    >
      <Swiper showsButtons={false} loop={false}>
        <View style={styles.slides}>
          <Image source={logo} style={styles.icon}></Image>
          <Text style={styles.tagline}>Welcome to ProductiviTree!</Text>
          <GoogleAuth navigate={navigation} />
        </View>
        <View style={styles.slides}>
          <Image source={study} style={styles.icon}></Image>
          <Text style={styles.tagline}>
            Stay happy, healthy, and productive by keeping track of your
            activites!
          </Text>
          <GoogleAuth navigate={navigation} />
        </View>
        <View style={styles.slides}>
          <Image source={friends} style={styles.icon}></Image>
          <Text style={styles.tagline}>
            Check up on your friends to make sure they’re doing well!
          </Text>
          <GoogleAuth navigate={navigation} />
        </View>
        <View style={styles.slides}>
          <Image source={tree} style={styles.icon}></Image>
          <Text style={styles.tagline}>
            Gain points to plant trees and help the environment!
          </Text>
          <GoogleAuth navigate={navigation} />
        </View>
      </Swiper>
    </LinearGradient>
  );
};

export default LogIn;
