import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from './Home';
import Profile from './Profile';
import Order from './Order';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  UserIcon,
  Bars3Icon,
  HomeModernIcon,
  HomeIcon,
} from 'react-native-heroicons/solid';

const BottomStack = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#D65600',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Poppins-Medium',
        },
      }}>
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarIcon: ({size, color}) => (
            <Bars3Icon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({size, color}) => <HomeIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({size, color}) => <UserIcon color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomStack;

const styles = StyleSheet.create({});
