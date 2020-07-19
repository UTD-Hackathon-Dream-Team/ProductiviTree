import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Content, Body, ListItem, Left, Icon, Right, Title  } from "native-base";

const listCard = ({ item }) => {
    
    return (
      <ListItem>
        <Left style={{ flexDirection: "column"}}>
            <Text style={{ fontWeight: "bold" }}>
            {item.description}
          </Text>
          
          <Text style={{ fontWeight: "bold" }}>
            {item.points} pts
          </Text>
        </Left>
        <Right>
            <Text style={{ fontWeight: "bold" }}>
            {item.progress}/{item.goal}
          </Text>
        </Right>
      </ListItem>
    );
}

const Challenge = (props) => {
  //console.log(props);
  const challenges = props.challenges;

  return (
    <Content padder>
      <FlatList
        data={challenges}
        renderItem={listCard}
        keyExtractor={item => item._id}
      />
    </Content>
  );
};

export default Challenge;
