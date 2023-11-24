import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TextView from './TextView';

const ErrorMessage = ({message}) => {
  return (
    <View>
      <TextView
        fontSize={14}
        textAlign="left"
        alignSelf="left"
        marginHorizontal={15}
        color="red">
        {message}
      </TextView>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({});
