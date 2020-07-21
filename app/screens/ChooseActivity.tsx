import React, { useEffect, useState } from "react";
import {
  Spinner,
  Content,
  Text,
  List,
  ListItem,
  Card,
  CardItem,
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
var _ = require("lodash");
const axios = require("axios").default;

const ChooseActivity = (props) => {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const activities = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/activities/`
      );
      setActivities(activities.data.payload);
    };
    fetchData();
  }, []);

  const generateCards = () => {
    const result = _.groupBy(activities, "Activity");
    return Object.keys(result).map((cat) => {
      <>
        <Text>{cat}</Text>
        <List
          dataArray={result[cat]}
          horizontal={true}
          renderRow={(item) => (
            <ListItem>
              <Card>
                <CardItem>
                  <Text>{item.Category}</Text>
                </CardItem>
              </Card>
            </ListItem>
          )}
        ></List>
      </>;
    });
  };

  return (
    <LinearGradient
      colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]}
      style={{ flex: 1 }}
    >
      <Header backButton={true} navigation={props.navigation} />
      <Content padder>
        {activities && generateCards()}
        {!activities && <Spinner />}
      </Content>
    </LinearGradient>
  );
};

export default ChooseActivity;
