import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Content, Body } from "native-base";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    borderRadius: 6,
    color: "#ffffff",
  },
});

const ProfileInfo = (props) => {
  //console.log(props);
  const user = props.user;
  const type = props.type;

  return (
    <Content padder>
      <Text>{type}</Text>
    </Content>
  );
};

export default ProfileInfo;
