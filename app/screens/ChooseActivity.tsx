import React, { useEffect, useState } from "react";
import {
  Spinner,
  Content,
  Text,
  List,
  ListItem,
  Card,
  CardItem,View
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import { result } from "lodash";
var _ = require("lodash");
const axios = require("axios").default;

const ChooseActivity = (props) => {
  const [activities, setActivities] = useState(null);
  const [mentalActivities, setMentalActivities] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const activities = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/activities/`
      );
      setActivities(activities.data.payload);
      const groups = _.groupBy(activities.data.payload, "Category");
      setMentalActivities(groups.Mental);
    };
    fetchData();
  }, []);

  return (
    <LinearGradient
      colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]}
      style={{ flex: 1 }}
    >
      <Header backButton={true} navigation={props.navigation} />
      <Content padder>
        {activities && 
          <View>
            <Text>Mental Health</Text>
            <List
              dataArray={mentalActivities}
              horizontal={true}
              renderRow={(item) => (
                <ListItem>
                  <Card>
                    <CardItem>
                      <Text>{item.Activity}</Text>
                    </CardItem>
                  </Card>
                </ListItem>
              )}
            ></List>
            <Text>Educational / Professional</Text>
            <Text>Physical Health</Text>
            <Text>Environmental</Text>
          </View>
        }
        {!activities && <Spinner />}
      </Content>
    </LinearGradient>
  );
};

export default ChooseActivity;
