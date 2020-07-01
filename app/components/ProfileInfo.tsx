import React, {useState, useEffect} from "react";
import {
  Image,
  Text,
  View,  
  StyleSheet,
} from 'react-native';
import {  LinearGradient }from "expo-linear-gradient";
import { 
  Container,
  Header,
  Content,
  Body,
  Title, 
  Left,
  Spinner,
  Right,
  Icon, 
  Button,
} from "native-base";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    borderRadius: 6,
    color: "#ffffff"
  }
}); 

export default class ProfileInfo extends React.Component{
 
  render(){
    return (
      <Container>
        <LinearGradient
        colors={["#C8F0EE", "#A1C6F1"]}
        style={{ flex: 1 }}
        >      
            <Content padder>
                {/* <Body>
                    <Title>
                        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Profile</Text>
                    </Title>
                </Body> */}
                <View style={{ flexDirection: "row", padding: 8, paddingLeft: 25 }}>
                    <Image
                        source={{
                        uri: "https://lh3.googleusercontent.com/a-/AOh14GjD3RtSISuOb0l9-cQvrin2baf74l2lPtqpNMu3dA",
                        }}
                        style={{
                        height: 150,
                        width: 150,
                        borderRadius: 120,
                        }}
                    />
                    <Body
                        style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: 30,
                        }}
                    >
                        <Title>
                            <Text style={{ fontSize: 25, fontWeight: "bold" }}> Username </Text>
                        </Title>
                        <Title>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}> X Trees Planted </Text>
                        </Title>
                        <Title>
                            <Text> A Followers </Text>
                        </Title>
                        <Title>
                            <Text> B Following </Text>
                        </Title>
                    </Body>
                </View>
                <View>
                    <Body
                        style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 10,
                        }}
                    >
                        <Title>
                            <Text> Bio </Text>
                        </Title>
                    </Body>
                </View>                
            </Content>
        </LinearGradient>  
      </Container>      
    ); 
  } 
}
