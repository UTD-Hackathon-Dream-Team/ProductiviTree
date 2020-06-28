import React from "react";
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Content, Text, Button } from "native-base";
import GoogleAuth from "../components/GoogleAuth";

type Props = {
  navigation: StackNavigationProp<any, 'LogIn'>;
};

const LogIn: React.FC<Props> = ({ navigation }) => {
  return (
    <Container>
      <GoogleAuth navigate={navigation}/>
    </Container>
  );
};

export default LogIn;
