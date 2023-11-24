import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/Header';
import {leftArrow, loginTrue} from '../../Assets';
import TextView from '../../Components/TextView';
import {
  Done,
  Verificationcode,
  VerificationcodeText,
  Verify,
  resendVerificationCode,
  VerificationSuccessCode,
  Success,
} from '../../Constant/AllStrings';
import Button from '../../Components/Button';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import ModalScreen from '../../Components/ModalScreen';
import CommonStyles from '../../Helper/CommonStyles';
import ApiClient from '../../api/apiClient';
import {API_VerifyNumber} from '../../api/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CELL_COUNT = 4;

const Verification = ({route, navigation}) => {
  // console.log('route data from signup', route.params.verifyData);
  const {phone, user_id} = route.params.verifyData;
  const [value, setValue] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const _handleVerify = async () => {
    // openModal();
    const payload = {
      user_id: user_id,
      otp: parseInt(value),
    };
    const res = await ApiClient.post(API_VerifyNumber, payload, '');

    console.log('verify data ', res);
    if (res.status == 200) {
      await AsyncStorage.setItem('AccessToken', res?.data?.access_token);
      await AsyncStorage.setItem('ReffToken', res?.data?.refresh_token);
      await AsyncStorage.setItem('User_ID', res?.data?.user_id);
      openModal();
    } else {
      alert(res.data.message);
    }
  };

  return (
    <SafeAreaView>
      <View style={CommonStyles.container}>
        <Header iconName={leftArrow} back={() => navigation.goBack()} />
        <TextView
          fontWeight={500}
          fontSize={26}
          marginTop={30}
          marginHorizontal={15}>
          {Verificationcode}
        </TextView>

        <View style={[CommonStyles.textWithBold, {marginTop: 20}]}>
          <TextView color="#BDB3C7"> {VerificationcodeText}</TextView>
          <TextView fontWeight="700"> {phone}</TextView>
        </View>
        <View
          style={{
            marginTop: 15,
            // backgroundColor: 'red',
            marginHorizontal: 15,
            width: '60%',
            justifyContent: 'space-around',
            alignSelf: 'center',
          }}>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>

        <Button
          onClick={() => _handleVerify()}
          btnName={Verify}
          broderRadius={5}
          borderWidth={0}
          marginTop={25}
        />
        {/* <TextView
          fontWeight={400}
          fontSize={14}
          marginHorizontal={15}
          marginTop={30}>
          {resendVerificationCode}
        </TextView> */}
        <View style={[CommonStyles.textWithBold, {marginTop: 20}]}>
          <TextView color="#BDB3C7"> {resendVerificationCode}</TextView>
          <TextView
            onPress={() => navigation.navigate('Signup')}
            fontWeight="700">
            {' '}
            Resend
          </TextView>
        </View>
      </View>
      <ModalScreen
        modalButton={() => {
          navigation.navigate('Home');
          closeModal();
        }}
        visible={modalVisible}
        hide={closeModal}
        Done={Done}
        modalheading={Success}
        modalText={VerificationSuccessCode}
        mailImg={loginTrue}
      />
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    backgroundColor: '#261148',
    borderColor: '#261148',
    textAlign: 'center',
    borderRadius: 8,
    color: '#ffffff',
  },
  focusCell: {
    borderColor: '#AE00FF',
  },
});
