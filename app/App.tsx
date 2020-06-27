import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import TopStack from './navigation/TopStack';

const App = () => {
  const [ready, setReady] = useState(false);

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
    <NavigationContainer>
      <TopStack/>
    </NavigationContainer>
  );
}

export default App;
