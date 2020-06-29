import React, {useContext} from "react";
import { Container, Content, Text } from "native-base";
import {context} from "../context" ;

const Challenges = () => {
  // Get googleID from context._currentValue.googleID
  console.log("Challenges", context._currentValue.googleID);
  return (
    <Container>
      <Content>
        <Text>Challenges</Text>
      </Content>
    </Container>
  );
};

export default Challenges;
