// In App.js in a new project

import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTabs from '../BottomTabNavigation/BottomTab';
import Splash from '../../Screens/SplashScreen/Splash';
import Signup from '../../Screens/SignupScreen/Signup';
import Login from '../../Screens/LoginScreen/Login';
import ResetPassword from '../../Screens/ResetPasswordScreen/ResetPassword';
import CreatePassword from '../../Screens/CreatePassword/CreatePassword';
import Verification from '../../Screens/VerificationPassScreen/Verification';
import VideoPlayer from '../../Screens/VideoPlayerScreen/VideoPlayer';
import FilterScreen from '../../Screens/FilterScreen/FilterScreen';
import SelectFilter from '../../Screens/FilterScreen/SelectFilter';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="CreatePassword" component={CreatePassword} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="Home" component={MyTabs} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />

        <Stack.Screen name="FilterScreen" component={FilterScreen} />
        <Stack.Screen name="SelectFilter" component={SelectFilter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
