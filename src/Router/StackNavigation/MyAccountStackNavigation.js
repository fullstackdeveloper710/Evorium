import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyAccount from '../../Screens/MyAccountScreen/MyAccount';
import EditProfile from '../../Screens/MyAccountScreen/EditProfile';
import MyProgram from '../../Screens/MyAccountScreen/MyProgram';
import MyDownloads from '../../Screens/MyAccountScreen/MyDownloads';
import EditMyDownload from '../../Screens/MyAccountScreen/EditMyDownload';
import SelectLanguageScreen from '../../Screens/MyAccountScreen/SelectLanguageScreen';
import SettingScreen from '../../Screens/MyAccountScreen/SettingScreen';

const Stack = createNativeStackNavigator();
const MyAccountStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyAccount"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="MyProgram" component={MyProgram} />
      <Stack.Screen name="MyDownloads" component={MyDownloads} />
      <Stack.Screen name="EditMyDownload" component={EditMyDownload} />
      <Stack.Screen
        name="SelectLanguageScreen"
        component={SelectLanguageScreen}
      />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
};

export default MyAccountStackNavigation;

const styles = StyleSheet.create({});
