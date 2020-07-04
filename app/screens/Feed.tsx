import React, { useContext } from "react";
import { Container, Content, Text } from "native-base";
import { AuthContext } from "../AuthContext";
import GoogleLogOut from "../components/GoogleLogOut";

const Feed = () => {
  const auth = useContext(AuthContext);
  return (
    <Container>
      <Content>
        <Text>feed of {auth.googleID}</Text>
      </Content>
    </Container>
  );
};

export default Feed;
