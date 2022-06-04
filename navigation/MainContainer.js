import * as React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import HomeScreenNavigator from './CustomNavigation';
import ProfileScreenNavigator from './ProfileNavigation';
import ReportsNavigator from './ReportNavigation';
import InfoScreen from './screens/InfoScreen';
import FeedbackScreen from './screens/ReportsScreen/FeedbackScreen';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Colors from '../constants/Colors';
import { StackActions } from '@react-navigation/native';

const Tab = createBottomTabNavigator();


export default function MainContainer() {
  return (
      <Tab.Navigator
        initialRouteName={'Home'}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let routename = route.name;

            if (routename === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
              color = focused ? Colors.colors.theme : 'grey';
            } else if (routename === 'Reports') {
              iconName = focused ? 'list' : 'list-outline';
              color = focused ? Colors.colors.theme : 'grey';
            } else if (routename === 'Profile') {
              iconName = focused ? 'people-circle' : 'people-circle-outline';
              color = focused ? Colors.colors.theme : 'grey';
            } else if (routename === 'Info') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
              color = focused ? Colors.colors.theme : 'grey';
            }
            else if (routename === 'Feedback') {
              iconName = focused ? 'checkbox' : 'checkbox-outline';
              color = focused ? Colors.colors.theme : 'grey';
            }

            return <Ionicons name={iconName} size={size} color={color} />
             
          },
          tabBarActiveTintColor: Colors.colors.theme,
          tabBarInactiveTintColor: 'grey',
        })}
        >
      <Tab.Screen name={'Home'} component={HomeScreenNavigator} options={{ headerShown: false }} />
      <Tab.Screen name={'Reports'} component={ReportsNavigator} options={{ headerShown: false }} />
      <Tab.Screen name={'Profile'} component={ProfileScreenNavigator} options={{ headerShown: false }} />
      <Tab.Screen name={'Info'} component={InfoScreen} options={{ headerShown: false }} />
      <Tab.Screen name={'Feedback'} component={FeedbackScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
    
  )
}
