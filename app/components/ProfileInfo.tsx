import React, {useState, useEffect} from "react";
import {
  Image,
  Text,
  View,  
  StyleSheet,
  TouchableOpacity
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

const ProfileInfo = ({user} : { user: any}) => {
    let [userFollowers, setUserFollowers] = useState(0);
    let [userFollowing, setUserFollowing] = useState(0);

    useEffect(() => {
        async function fetchData() {
            setUserFollowers(user.Followers.length);
            setUserFollowing(user.Following.length);
        }
        fetchData();
      }, []);
  
    return (
        <Content padder>
            <View style={{ flexDirection: "row", padding: 8, paddingLeft: 25 }}>
                <Image
                    source={{
                    uri: user.ProfilePic,
                    }}
                    style={{
                    height: 100,
                    width: 100,
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
                        <Text style={{ fontSize: 25, fontWeight: "bold" }}> {user.Username} </Text>
                    </Title>
                    <Title>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}> {user.Trees} Trees Planted </Text>
                    </Title>
                    <TouchableOpacity>
                        <Text> {userFollowers} Followers </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text> {userFollowing} Following </Text>
                    </TouchableOpacity>
                </Body>
            </View>
            <View>
                <Text> Bio: {user.Bio} </Text>
            </View>                
        </Content>
    );
};
  
export default ProfileInfo;
