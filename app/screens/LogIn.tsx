import React, {useContext} from "react";
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Content, Text, Button } from "native-base";
import GoogleAuth from "../components/GoogleAuth";
import {context} from "../context" ;

type Props = {
  navigation: StackNavigationProp<any, 'LogIn'>;
};

const LogIn: React.FC<Props> = ({ navigation }) => {
  console.log("Login", context._currentValue.googleID);

  return (
    <Container>
      <GoogleAuth navigate={navigation}/>
    </Container>
  );
};

export default LogIn;
