import React, { useState, useEffect } from 'react';
import { Container, Content, Text, Button } from "native-base";

const GoogleAuth = ({navigate} : { navigate: any}) => {

  return (
    <Content>
        <Button onPress={() => navigate.navigate('MainStack')}>
            <Text>Sign In With Google</Text>
        </Button>
      </Content>
  );
}

export default GoogleAuth;
