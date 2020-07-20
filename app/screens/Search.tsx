import React, { useState, useEffect, useContext } from "react";
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import { ScrollView, RefreshControl, StyleSheet } from "react-native";

const axios = require("axios").default;

const Challenges = () => {
  

  async function fetchData() {
    
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
        <Header searchBar rounded >
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={text => console.log(text)} autoCorrect={false} />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </Container>
  );
};

export default Challenges;
