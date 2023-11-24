import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import CommonStyles from '../../Helper/CommonStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../Components/Header';
import {Notifications} from '../../Constant/AllStrings';
import {
  notificationMessagImg,
  notificationPreImg,
  notificationtodayImg,
  timerImg,
  yellowPoniterIcon,
} from '../../Assets';
import NotificationViewContainer from '../../Components/NotificationViewContainer';

const Notification = () => {
  return (
    <SafeAreaView>
      <View style={CommonStyles.container}>
        <Header
          headingText={Notifications}
          fontSize={18}
          fontWeight={700}
          color={'#FFF'}
        />
        <KeyboardAwareScrollView
          style={{
            marginHorizontal: 15,
            // backgroundColor: 'yellow',
            marginBottom: Platform.OS === 'ios' ? 150 : 70,
          }}>
          <View style={{marginBottom: 10, marginTop: 10}}>
            <NotificationViewContainer
              notificationtodayImg={notificationtodayImg}
              yellowPoniterIcon={yellowPoniterIcon}
              timerImg={timerImg}
            />
          </View>
          <View style={styles.bottomlineBreak}></View>
          <View style={{marginBottom: 10, marginTop: 10}}>
            <NotificationViewContainer
              notificationtodayImg={notificationMessagImg}
              timerImg={timerImg}
            />
          </View>
          <View style={{marginBottom: 10}}>
            <NotificationViewContainer
              notificationtodayImg={notificationPreImg}
              timerImg={timerImg}
            />
          </View>
          <View style={{marginBottom: 10}}>
            <NotificationViewContainer
              notificationtodayImg={notificationMessagImg}
              timerImg={timerImg}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  bottomlineBreak: {
    opacity: 0.2,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
});
