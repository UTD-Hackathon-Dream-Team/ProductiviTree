import React, {useContext} from "react";
import { Container, Content, Text } from "native-base";
import {context} from "../context" ;

const Settings = () => {
  // Get googleID from context._currentValue.googleID
  console.log("Settings", context._currentValue.googleID);
  return (
    <Container>
      <Content>
        <Text>Settings</Text>
      </Content>
    </Container>
  );
};

export default Settings;
