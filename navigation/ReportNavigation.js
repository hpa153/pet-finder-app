import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ReportsScreen from './screens/ReportsScreen'
import MissingPetReports from './screens/ReportsScreen/MissingPetReports';
import MissingPetDetails from './screens/ReportsScreen/MissingPetReports/MissingPetDetails';
import FoundPetReports from './screens/ReportsScreen/FoundPetReports';
import AdoptScreen from './screens/ReportsScreen/AdoptScreen';
import AdoptForm from './screens/ReportsScreen/AdoptScreen/AdoptForm';

const Stack = createNativeStackNavigator();

const ReportsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ReportsScreen"
    >
      <Stack.Screen 
        name="ReportsNavigator"
        component={ReportsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="MissingPetReports"
        component={MissingPetReports}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="MissingPetDetails"
        component={MissingPetDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AdoptReports"
        component={AdoptScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AdoptForm"
        component={AdoptForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="FoundPetReports"
        component={FoundPetReports}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default ReportsNavigator;
