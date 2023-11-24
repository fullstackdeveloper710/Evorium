import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import CommonStyles from '../Helper/CommonStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextView from './TextView';

const NotificationViewContainer = props => {
  const {notificationtodayImg, yellowPoniterIcon, timerImg} = props;
  return (
    <View style={CommonStyles.viewContainer}>
      <View
        style={{
          flex: 0.2,
        }}>
        <Image
          source={notificationtodayImg}
          style={{width: 38, height: 38}}
          resizeMode="contain"
        />
      </View>

      <View
        style={{
          flex: 0.8,
        }}>
        <TextView
          textAlign={'left'}
          alignSelf={'left'}
          fontSize={14}
          color={'#ffffff'}
          fontWeight={'500'}>
          Successful purchase!
        </TextView>
        <TextView
          textAlign={'left'}
          alignSelf={'left'}
          fontSize={12}
          color={'#BDB3C7'}
          marginTop={4}
          fontWeight={'400'}>
          You’ve succesfully paid for...
        </TextView>
      </View>
      <View
        style={{
          flex: 0.2,
          alignItems: 'flex-end',
        }}>
        <Image
          source={yellowPoniterIcon}
          style={{width: 10, height: 10}}
          resizeMode="contain"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            marginTop: 10,
          }}>
          <Image
            source={timerImg}
            style={{width: 14, height: 14}}
            resizeMode="contain"
          />
          <TextView
            textAlign={'left'}
            alignSelf={'left'}
            fontSize={12}
            color={'#BDB3C7'}
            fontWeight={'400'}>
            {' '}
            9:41
          </TextView>
        </View>
      </View>
    </View>
  );
};

export default NotificationViewContainer;

const styles = StyleSheet.create({});
