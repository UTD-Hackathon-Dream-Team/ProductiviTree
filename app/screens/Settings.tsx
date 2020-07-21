import React, { useContext, useState } from "react";
import { Container, Content, Text, View, Body,  Title , Button, ListItem } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Switch, StyleSheet, Image } from "react-native";


const Settings = (props: { user: any; }) => {
  
  const user = props.user;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
  
    <Container>
        <LinearGradient
        colors={["#C8F0EE", "#A1C6F1"]}
        style={{ flex: 1 }}
      >    
        <Content padder>        
            <Title>
              <Text style={{ fontSize: 40, fontWeight: "bold", textAlign: "left"}}>Settings</Text>
            </Title>      
            <Image
              source={{
                uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.delish.com%2Ffood-news%2Fa26839032%2Fbenefits-of-tangerines%2F&psig=AOvVaw3xDsXc57fANL1e5B16p5Mu&ust=1593480436692000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjc56zvpeoCFQAAAAAdAAAAABAD",
              }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
              }}
            />
        <Body
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            paddingLeft: 30,
          }}
        ></Body>
        <Button>
      <Text>
        Change Profile Picture
      </Text>
      </Button>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Bio:  
          </Text>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
           Current Bio:  
          </Text>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Daily Points:  200
          </Text>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
           Current Points:  30
          </Text>
          
         

        <ListItem>
          
        <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "left" }}>
            Push Notifications  
          </Text>
          
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
                 
        </ListItem>

        <ListItem>
        <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "left" }}>
           Email Notifications  
          </Text>
          
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
               
        </ListItem>
        
        </Content>
      </LinearGradient>
    </Container>
   
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "baseline",
    justifyContent: "flex-start"
  }
});

export default Settings;
