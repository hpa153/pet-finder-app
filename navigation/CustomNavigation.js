import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ReportMissingPetScreen from './screens/ReportMissingPetScreen';
import FoundMissingPetScreen from './screens/FoundMissingPetScreen';

const Stack = createNativeStackNavigator();

const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeNavigator"
    >
      <Stack.Screen 
        name="HomeNavigator"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ReportMissingPet"
        component={ReportMissingPetScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="FoundMissingPet"
        component={FoundMissingPetScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default HomeScreenNavigator;
