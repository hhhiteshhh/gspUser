import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SliderScreen from './SliderScreen';
import OTPScreen from './OTPScreen';
const Stack = createStackNavigator();

function AuthStack(props) {
  const [mobileNumber, setMobileNumber] = useState('');
  const handleMobileNumber = mobile => {
    setMobileNumber(mobile);
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SliderScreen"
        component={SliderScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="LoginScreen" options={{headerShown: false}}>
        {props => (
          <LoginScreen
            {...props}
            mobileNumber={mobileNumber}
            handleMobileNumber={handleMobileNumber}
          />
        )}
      </Stack.Screen>
      <Stack.Screen options={{headerShown: false}} name="OTPScreen">
        {props => <OTPScreen {...props} mobileNumber={mobileNumber} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default AuthStack;
