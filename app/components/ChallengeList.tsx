import React, {useContext} from "react";
import { Text, FlatList } from "react-native";
import { Content, ListItem, Left, Right, Toast } from "native-base";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../AuthContext";

const axios = require("axios").default;

const listCard = ({ item }) => {

    function challengeHandler() {
      if (item.progress == item.goal){
        console.log("Points given")
      }
      else{
        console.log("No points");
        // Toast.show({
        //   text: `You haven't completed all tasks`,
        //   buttonText: "Okay",
        //   position: "bottom",
        // });
      }
    }
    
    return (
        <ListItem>
          <Left style={{ flexDirection: "column"}}>
            <TouchableOpacity onPress={challengeHandler}>
                <Text style={{ fontWeight: "bold" }}>
                {item.description}
              </Text>
              
              <Text style={{ fontWeight: "bold" }}>
                {item.points} pts
              </Text>
              </TouchableOpacity>
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
