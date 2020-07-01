import React from "react";
import { Container, Content, Text } from "native-base";
import {context} from "../context" ;
import ProfileInfo from "../components/ProfileInfo"

const Profile = () => {

  console.log("Profile", context._currentValue.googleID);

  return (
    <Container>
      <Content>
        <ProfileInfo/>
      </Content>
    </Container>
  );
};

export default Profile;
