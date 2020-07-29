import React, { useEffect, useContext, useState } from "react";
import { Header, Left, Right, Body, Icon, Text, Thumbnail, Button } from "native-base";
import { AuthContext } from "../AuthContext";

const axios = require("axios").default;

const CustomHeader = (props) => {
  const auth = useContext(AuthContext);
  let [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
      );
      setUser(result.data.payload);
    }
    fetchData();
  }, []);

  return (
    <Header style={{ backgroundColor: "#3F51B5" }}>
      <Left>
        {props.backButton && (
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        )}
      </Left>
      <Body>
        <Text style={{ color: "#fff" }}>{"Productivitree".toUpperCase()}</Text>
      </Body>
      <Right>
        {!props.settings ? (
          user && (
            <Button transparent onPress={() => props.navigation.navigate("Profile")}>
              <Thumbnail small source={{ uri: user!.ProfilePic }} />
            </Button>
          )
        ) : (
          <Button transparent onPress={() => props.navigation.navigate("Settings")}>
            <Icon name="md-settings" />
          </Button>
        )}
      </Right>
    </Header>
  );
};

export default CustomHeader;
