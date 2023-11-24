import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import VideoPlayer from '../../Screens/VideoPlayerScreen/VideoPlayer';
import PaidVideoPlayer from '../../Screens/VideoPlayerScreen/PaidVideoPlayer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../Screens/HomeScreen/Home';
import Payment from '../../Screens/MyAccountScreen/Payment';
Payment;
const Stack = createNativeStackNavigator();
const HomeStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
      <Stack.Screen name="PaidVideoPlayer" component={PaidVideoPlayer} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;

const styles = StyleSheet.create({});
