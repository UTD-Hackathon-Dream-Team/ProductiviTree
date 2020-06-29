import React, {useContext} from "react";
import { Container, Content, Text } from "native-base";
import {context} from "../context" ;

const Stats = () => {
  // Get googleID from context._currentValue.googleID
  console.log("Stats", context._currentValue.googleID);
  return (
    <Container>
      <Content>
        <Text>stats</Text>
      </Content>
    </Container>
  );
};

export default Stats;
