import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Switch,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/Header';
import {leftArrow, rightArrow} from '../../Assets';
import {
  SettingsText,
  DeleteaccountText,
  LogoutText,
} from '../../Constant/AllStrings';
import TextView from '../../Components/TextView';
import CommonStyles from '../../Helper/CommonStyles';
import Button from '../../Components/Button';
import ApiClient from '../../api/apiClient';
import {API_DeleteAccount} from '../../api/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const [data, setData] = useState([
    {
      id: 1,
      name: 'FAQ',
    },
    {
      id: 2,
      name: 'Support',
    },
    {
      id: 3,
      name: 'Privacy policy',
    },
  ]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        CommonStyles.renderItemSty,
        {
          borderBottomWidth: 0.5,
          borderBottomColor: '#545458',
          paddingVertical: 18,
        },
      ]}>
      <TextView
        textAlign="left"
        alignSelf="left"
        fontSize={16}
        fontWeight={500}>
        {item.name}
      </TextView>
      <Image source={rightArrow} resizeMode="contain"></Image>
    </TouchableOpacity>
  );

  const _handleAccount = async () => {
    alert(global.user_id);
    const res = await ApiClient.delete(
      API_DeleteAccount + global.user_id,
      {},
      global.token,
    );
    if (res.status === 200) {
      navigation.navigate('Login');
    } else console.log('-------res------', res);
  };

  const _handleLogOut = () => {
    AsyncStorage.clear().then(() => console.log('Cleared'));
    global.user_id = '';
    alert('logout');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView>
      <View style={{height: '100%', backgroundColor: '#1F043B'}}>
        <Header
          iconName={leftArrow}
          headingText={SettingsText}
          fontSize={18}
          fontWeight={700}
          color={'#FFF'}
          back={() => navigation.goBack()}
        />
        <View style={CommonStyles.toggleButtonSty}>
          <TextView
            fontSize={16}
            fontWeight={400}
            alignSelf="left"
            textAlign="left">
            Notifications
          </TextView>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#fff' : '#81b0ff'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          {/* <Text>{isEnabled ? 'Switch is ON' : 'Switch is OFF'}</Text> */}
        </View>
        <View
          style={{
            marginTop: 5,
            marginBottom: 50,
          }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            scrollEnabled={false}
          />
        </View>
        <TextView width={'70%'} fontSize={11} fontWeight={400}>
          Copywright © 2023 EVORIUM Logged in with Example@mail.ru
        </TextView>
        <TextView fontSize={11} fontWeight={400} marginTop={20}>
          3.119.0 07806
        </TextView>
        <Button
          onClick={() => _handleLogOut()}
          btnName={LogoutText}
          marginTop={20}
          backgroundColor="#432F64"
          borderWidth={0}
        />
        <TextView
          onPress={() => _handleAccount()}
          fontSize={14}
          fontWeight={500}
          marginTop={20}>
          {DeleteaccountText}
        </TextView>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
