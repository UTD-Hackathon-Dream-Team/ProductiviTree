import React, {useContext} from "react";
import { Container, Content, Text } from "native-base";
import {context} from "../context" ;
import GoogleLogOut from "../components/GoogleLogOut";

const Feed = () => {
  // Get googleID from context._currentValue.googleID
  console.log("Feed", context._currentValue.googleID);
  return (
    <Container>
      <Content>
        <Text>feed</Text>
      </Content>
    </Container>
  );
};

export default Feed;
