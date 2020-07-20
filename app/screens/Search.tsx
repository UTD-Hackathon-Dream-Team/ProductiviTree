import React, { useState, useEffect, useContext } from "react";
import { Container, Header, Item, Input, Icon, Button, Text, List, ListItem, Left, Right } from 'native-base';
import { FlatList, RefreshControl } from "react-native";

const axios = require("axios").default;

const Challenges = () => {
    let [data, setData] = useState([]);
    var [newData, setNewData] = useState([]);

  async function fetchData() {
    const keys = [
        {
            name: "one",
            key: 1
        },
        {
            name: "two",
            key: 2
        },
        {
            name: "three",
            key: 3
        }
    ]
    setData(keys);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const searchFilterFunction = text => {    
    const filteredData = data.filter(item => {      
        const itemData = item.name.toUpperCase();
        
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;    
    });
    setNewData(filteredData); 
  };

  const userCard = ({ item }) => {
    
    return (
      <ListItem>
        <Text>{item.name}</Text>
      </ListItem>
    );
}

  return (
    <Container>
        <Header searchBar rounded >
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" onChangeText={text => {searchFilterFunction(text)}} autoCorrect={false} />
          <Icon name="ios-people" />
        </Item>
        
      </Header>
    <List>
      <FlatList          
        data={newData}          
        renderItem={userCard}
        keyExtractor={item => item.key}
         
      />            
    </List>
    </Container>
      
  );
};

export default Challenges;
