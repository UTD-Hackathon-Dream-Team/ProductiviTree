import React, { useEffect, useState } from "react";
import { Spinner, Content, Text, List, ListItem, Card, View, Button } from "native-base";
import { Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
var _ = require("lodash");
const axios = require("axios").default;

const ChooseActivity = (props) => {
  const [activities, setActivities] = useState(null);
  const [mentalActivities, setMentalActivities] = useState(null);
  const [educationalActivities, setEducationalActivities] = useState(null);
  const [physicalActivities, setPhysicalActivities] = useState(null);
  const [environmentalActivities, setEnvironmentalActivities] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const activities = await axios(`https://productivitree.wl.r.appspot.com/api/v1/activities/`);
      setActivities(activities.data.payload);
      const groups = _.groupBy(activities.data.payload, "Category");
      setMentalActivities(groups.Mental);
      setEducationalActivities(groups.Educational);
      setPhysicalActivities(groups.Physical);
      setEnvironmentalActivities(groups.Environmental);
    };
    fetchData();
  }, []);

  function goToAddPost(item) {
    props.navigation.navigate("AddPost", { activity: item._id });
  }

  const ActivityList = (props) => {
    return (
      <>
        <List
          dataArray={props.category}
          horizontal={true}
          renderRow={(item) => (
            <ListItem>
              <Card>
                <TouchableOpacity
                  onPress={() => goToAddPost(item)}
                  style={{
                    alignItems: "center",
                    padding: 10,
                    backgroundColor: "#303ca6",
                  }}
                >
                  <Image
                    source={{ uri: item.Icon }}
                    style={{ height: 65, width: 65, padding: 10 }}
                  />
                  <Text style={{ color: "#fff" }}>{item.Activity.toUpperCase()}</Text>
                </TouchableOpacity>
              </Card>
            </ListItem>
          )}
        ></List>
      </>
    );
  };

  return (
    <LinearGradient colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]} style={{ flex: 1 }}>
      <Header backButton={true} navigation={props.navigation} />
      <Content padder>
        {activities && (
          <View>
            <Text style={{ textAlign: "center", fontSize: 32, padding: 10 }}>Mental Health</Text>
            <ActivityList category={mentalActivities} />

            <Text style={{ textAlign: "center", fontSize: 30, padding: 10 }}>
              Educational / Professional
            </Text>
            <ActivityList category={educationalActivities} />

            <Text style={{ textAlign: "center", fontSize: 32, padding: 10 }}>Physical Health</Text>
            <ActivityList category={physicalActivities} />

            <Text style={{ textAlign: "center", fontSize: 32, padding: 10 }}>Environmental</Text>
            <ActivityList category={environmentalActivities} />
          </View>
        )}
        {!activities && <Spinner />}
      </Content>
    </LinearGradient>
  );
};

export default ChooseActivity;
