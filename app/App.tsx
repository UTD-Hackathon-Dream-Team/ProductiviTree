import React, { useState, useEffect , useCallback } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import TopStack from './navigation/TopStack';
import {context} from "./context" ;

const App = () => {
  const [ready, setReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const login = useCallback((googleID, accesstoken) => {
    // useCallback so not rerendered
    setIsLoggedIn(true);
    setUserId(googleID);
    setToken(accesstoken);
  }, []);
  
  const logout = useCallback(() => {
    setIsLoggedIn(false);
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
      isLoggedIn: !!token,
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
