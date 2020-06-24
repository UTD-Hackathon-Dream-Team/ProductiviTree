import React from "react";
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Content, Text, Button } from "native-base";

type Props = {
  navigation: StackNavigationProp<any, 'LogIn'>;
};

const LogIn: React.FC<Props> = ({ navigation }) => {
  return (
    <Container>
      <Content>
        <Button onPress={() => navigation.navigate('Profile')}><Text>Log In</Text></Button>
      </Content>
    </Container>
  );
};

export default LogIn;
