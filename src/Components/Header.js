import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import CommonStyles from '../Helper/CommonStyles';
import TextView from './TextView';

const Header = props => {
  const {iconName, headingText, headingText2, back, editHeader} = props;
  return (
    <View style={{height: 45}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={back}
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Image
            source={iconName}
            style={{width: 40, height: 40}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextView
            fontWeight={700}
            color={'#BDB3C7'}
            alignSelf="left"
            {...props}>
            {headingText}
          </TextView>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={editHeader}
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            right: 5,
          }}>
          <TextView
            fontWeight={400}
            color={'#BDB3C7'}
            alignSelf="left"
            {...props}>
            {headingText2}
          </TextView>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
