import {SafeAreaView, Text, View} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from '../../Helper/CommonStyles';
import Header from '../../Components/Header';
import {leftArrow, mailImg} from '../../Assets';
import TextView from '../../Components/TextView';
import {
  resetPassword,
  resetPassText,
  Send,
  RememberPassword,
  Done,
  modalheading,
  modalText,
  _blankEmail,
  _checkEmailWifValidation,
} from '../../Constant/AllStrings';
import InputFields from '../../Components/InputFields';
import Button from '../../Components/Button';
import ModalScreen from '../../Components/ModalScreen';
import {emailPattern} from '../../Helper/Regex';
import ApiClient from '../../api/apiClient';
import {API_forgetPassword} from '../../api/apiUrl';

const ResetPassword = ({navigation}) => {
  const [email, setEmail] = useState({value: '', err: ''});
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    // navigation.navigate('CreatePassword');
  };

  const validateEmail = email => {
    // Implement your email validation logic
    if (email.value == '') return _blankEmail;
    if (!emailPattern.test(email.value)) return _checkEmailWifValidation;
    return null;
  };

  const _handleSendButton = async () => {
    if (email.value == '') {
      setEmail({value: '', err: validateEmail(email)});
      flag = false;
    } else if (!email.value.match(emailPattern)) {
      setEmail({value: email.value, err: validateEmail(email)});
      flag = false;
    } else {
      const payload = {
        email: email.value,
      };
      const res = await ApiClient.post(API_forgetPassword, payload, '');
      // console.log('forgot Pass api res----', res);
      if (res.status === 200) {
        openModal();
        setEmail({value: '', err: ''});
      } else {
        console.log('forgot pass err--', res.message);
        alert(res.data.message);
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={CommonStyles.container}>
        <Header iconName={leftArrow} back={() => navigation.goBack()} />
        <TextView
          fontWeight={500}
          fontSize={26}
          alignSelf="left"
          textAlign="left"
          marginTop={30}
          marginHorizontal={15}>
          {resetPassword}
        </TextView>
        <TextView
          color="#BDB3C7"
          fontWeight={400}
          fontSize={14}
          alignSelf="left"
          textAlign="left"
          marginHorizontal={15}
          marginTop={30}>
          {resetPassText}
        </TextView>
        <View style={{marginTop: 15}}>
          <InputFields
            placeholder="Email"
            value={email.value}
            validate={validateEmail(email)}
            onChangeText={e => setEmail({value: e, err: ''})}
            validationMessage={email.err}
          />
        </View>
        <Button
          borderWidth={0}
          onClick={() => _handleSendButton()}
          btnName={Send}
          broderRadius={5}
          marginTop={20}
        />
        {/* <TextView marginTop={20}>{RememberPassword}</TextView> */}
        <View style={CommonStyles.textWithBold}>
          <TextView color="#BDB3C7">{RememberPassword}</TextView>
          <TextView
            onPress={() => navigation.navigate('Login')}
            fontWeight="700">
            {' '}
            Log in
          </TextView>
        </View>
      </View>
      <ModalScreen
        modalButton={() => closeModal()}
        visible={modalVisible}
        hide={closeModal}
        Done={Done}
        modalheading={modalheading}
        modalText={modalText}
        mailImg={mailImg}
      />
    </SafeAreaView>
  );
};

export default ResetPassword;
