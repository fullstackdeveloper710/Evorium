import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TextView = props => {
  return (
    <View>
      <Text onPress={props.onPress} style={[styles.textSty, {...props}]}>
        {props.children}
      </Text>
    </View>
  );
};

export default TextView;

const styles = StyleSheet.create({
  textSty: {
    fontFamily: 'Aeonik',
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
