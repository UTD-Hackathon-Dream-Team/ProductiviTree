import React from "react";
import { Text, FlatList } from "react-native";
import { Content, ListItem, Left, Right, Toast, View , Card, CardItem} from "native-base";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../AuthContext";

const axios = require("axios").default;

const listCard = ({ item }) => {


  const updatePoints = async () => {
    const newPoints = item.points;
    const userResponse = await axios(`https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`);
    const oldPoints = userResponse.data.payload.Points;
    const oldTrees = userResponse.data.payload.Trees;
    axios.patch( `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`, 
      {
        Points: oldPoints + newPoints,
      }
    )
    .then(function (response) {
      Toast.show({
        text: `You've earned ${newPoints} points!`,
        buttonText: "Okay",
        position: "bottom",
      });

      if ((oldPoints + newPoints) > 1000){
        axios.patch( `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`, 
          {
            Points: oldPoints + newPoints - 1000,
            Trees: oldTrees + 1
          }
        )
        Toast.show({
          text: `You've planted one more tree and earned ${newPoints} points!`,
          buttonText: "Okay",
          position: "bottom",
        });
      }
      setTimeout(() => {
        console.log("Go to feed / previous page here");
      }, 5000);
    })
  }

  function challengeHandler() {
    if (item.progress == item.goal){
      console.log("Points given");
      updatePoints();
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
      <Card>
        {
          item &&
          <TouchableOpacity onPress={challengeHandler}>
            <CardItem>
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
            </CardItem>
          </TouchableOpacity>
        }
        </Card>
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
