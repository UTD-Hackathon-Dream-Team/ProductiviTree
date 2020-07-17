import React, { useEffect, useContext, useState } from "react";
import {
  Header,
  Left,
  Right,
  Body,
  Text,
  Thumbnail,
  Button,
} from "native-base";
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
    <Header>
      <Left>{props.left && props.left}</Left>
      <Body>
        <Text>Productivitree</Text>
      </Body>
      <Right>
        {user && (
          <Button transparent onPress={() => props.navigate("Profile")}>
            <Thumbnail small source={{ uri: user!.ProfilePic }} />
          </Button>
        )}
      </Right>
    </Header>
  );
};

export default CustomHeader;
