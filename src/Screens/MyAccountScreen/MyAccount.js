import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../Components/Header';
import {MyAccountText} from '../../Constant/AllStrings';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Constant/dimensions';
import {profileIcon, rightArrow, AccountMoreImg} from '../../Assets';
import TextView from '../../Components/TextView';
import CommonStyles from '../../Helper/CommonStyles';
import ApiClient from '../../api/apiClient';
import {API_MyUserAcc} from '../../api/apiUrl';
import {useIsFocused} from '@react-navigation/native';

const MyAccount = ({navigation}) => {
  const isFocused = useIsFocused();
  const [userDetail, setUserDetail] = useState();
  const [data, setData] = useState([
    {
      id: 1,
      name: 'My programs',
      nav: 'MyProgram',
    },
    {
      id: 2,
      name: 'Downloads',
      nav: 'MyDownloads',
    },
    {
      id: 3,
      name: 'Payment',
      nav: 'payment',
    },
    {
      id: 4,
      name: 'Language',
      nav: 'SelectLanguageScreen',
    },
    {
      id: 5,
      name: 'Settings',
      nav: 'SettingScreen',
    },
  ]);

  useEffect(() => {
    getUerData();
  }, []);

  useEffect(() => {
    // Call the function
    if (isFocused) {
      getUerData();
    }
  }, [isFocused]);

  const getUerData = async () => {
    const data = {};
    const res = await ApiClient.get(API_MyUserAcc, data, global.token);
    console.log('my user account api res', res);
    if (res.status === 200) {
      setUserDetail(res.data.user_details);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        item.nav == 'payment' ? {} : navigation.navigate(item.nav)
      }
      activeOpacity={0.8}
      style={[
        CommonStyles.renderItemSty,
        {
          borderBottomWidth: 0.5,
          borderBottomColor: '#545458',
        },
      ]}>
      <TextView
        textAlign="left"
        alignSelf="left"
        fontSize={16}
        fontWeight={500}>
        {item.name}
      </TextView>
      <Image
        source={rightArrow}
        style={CommonStyles.rightArrowSty}
        resizeMode="contain"></Image>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView>
      {console.log(userDetail)}
      <View style={{height: '100%', backgroundColor: '#1F043B'}}>
        <Header
          headingText={MyAccountText}
          fontSize={18}
          fontWeight={700}
          color={'#FFF'}
        />

        <View
          style={{
            marginVertical: 20,
            marginHorizontal: 15,
            flexDirection: 'row',
            // flex: 1,
            alignItems: 'center',
            backgroundColor: '#2E1853',
            padding: 18,
            borderRadius: 5,
          }}>
          <View
            style={{
              flex: 0.2,
            }}>
            <Image
              source={
                userDetail?.profile_pic
                  ? {uri: userDetail?.profile_pic}
                  : profileIcon
              }
              resizeMode="contain"
              style={{width: 45, height: 45, borderRadius: 23}}
            />
          </View>

          <View
            style={{
              flex: 0.8,
            }}>
            <TextView
              textAlign={'left'}
              alignSelf={'left'}
              justifyContent={'center'}
              fontSize={16}
              color={'#ffffff'}
              fontWeight={'500'}>
              {userDetail?.full_name}
            </TextView>
          </View>
          <View
            style={{
              flex: 0.2,
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile', {userDetail})}>
              <Image
                source={AccountMoreImg}
                resizeMode="contain"
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{}}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            scrollEnabled={false}
          />
        </View>
        {/* <KeyboardAwareScrollView
          style={{
            marginHorizontal: 15,
            // backgroundColor: 'yellow',
            marginBottom: Platform.OS === 'ios' ? 150 : 70,
          }}></KeyboardAwareScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default MyAccount;

const styles = StyleSheet.create({});
