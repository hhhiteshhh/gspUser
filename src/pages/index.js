import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../components/SplashScreen';
import {InitialContext} from '../context';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
export default function Routes() {
  const {ready, user, isGuestUser} = useContext(InitialContext);

  if (!ready) return <SplashScreen />;
  return (
    <NavigationContainer>
      {user || isGuestUser === 'true' ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
