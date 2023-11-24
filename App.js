import {SafeAreaView, StyleSheet, Text, View, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import StackNavigation from './src/Router/StackNavigation/StackNavigation';

import {CustomStatusBar} from './src/Helper/iosStatusBar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import axios from 'axios';
import {url} from './src/api/apiUrl';
import {MyProvider} from './src/Helper/MyContext';
import notificationService from './src/Services/notificationService';

const App = () => {
  axios.defaults.baseURL = url;



  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor={'#1F043B'} />
      <MyProvider>
        <StackNavigation />
      </MyProvider>
    </SafeAreaProvider>
  );
};
export default App;

