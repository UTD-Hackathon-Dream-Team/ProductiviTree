import React, {useState, useEffect} from "react";
import { Container, Content, Text , View , Button} from "native-base";
import {  LinearGradient }from "expo-linear-gradient";
import {context} from "../context" ;
import ProfileInfo from "../components/ProfileInfo"

const axios = require("axios").default;

const Profile = () => {
  let [userID, setUserID] = useState(context._currentValue.googleID);
  let [user, setUser] = useState({});

  console.log("Profile", userID);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/users/${userID}`
      );
      setUser(result.data.payload);
      //console.log("User", user);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <LinearGradient
        colors={["#C8F0EE", "#A1C6F1"]}
        style={{ flex: 1 }}
        >
          <Content>
            <ProfileInfo user={user}/>
          </Content>
      </LinearGradient>
    </Container>
  );
};

export default Profile;
