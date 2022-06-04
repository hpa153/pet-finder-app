import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native';
import Login from './Login';
import Registration from './Registration';
import MainContainer from './MainContainer';
import ResetPassword from "./screens/ResetPassword";

const Stack = createNativeStackNavigator();

const LoginContainer = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName=""
    >
      <Stack.Screen 
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Main Container"
        component={MainContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Registration"
        component={Registration}
      />
      <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
      />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default LoginContainer;
