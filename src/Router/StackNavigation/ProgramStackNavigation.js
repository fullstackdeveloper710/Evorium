import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Program from '../../Screens/ProgramScreen/Program';
import ProgramContainer from '../../Screens/ProgramContainerScreen/ProgramContainerScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const ProgramStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Program"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Program" component={Program} />
      <Stack.Screen name="ProgramContainer" component={ProgramContainer} />
    </Stack.Navigator>
  );
};

export default ProgramStackNavigation;

const styles = StyleSheet.create({});
