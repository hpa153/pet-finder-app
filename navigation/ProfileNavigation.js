import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './screens/ProfileScreen';
import UpdateProfile from './screens/UpdateProfileScreen';

const Stack = createNativeStackNavigator();

const ProfileScreenNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileNavigator"
    >
      <Stack.Screen 
        name="ProfileNavigator"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Edit Profile"
        component={UpdateProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default ProfileScreenNavigator;
