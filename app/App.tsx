//Source for context: https://github.com/ReshmiCode/mern-app/blob/master/src/App.js

import React, { useState, useEffect , useCallback } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import TopStack from './navigation/TopStack';
import {context} from "./context" ;

const App = () => {
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  //login for context
  const login = useCallback((googleID, accesstoken) => {
    // useCallback so not rerendered
    setUserId(googleID);
    setToken(accesstoken);
  }, []);
  
  //logout for context
  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
  }, []);
  

  useEffect(() => {
    async function load() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      setReady(true);
    }
    load();
  }, []);

  if (!ready) {
    return <AppLoading />;
  }

  return (
    <context.Provider
      value={{
      accesstoken: token,
      googleID: userId,
      login: login,
      logout: logout,
      }}
    >
      <NavigationContainer>
        <TopStack/>
      </NavigationContainer>
    </context.Provider>
  );
}

export default App;
