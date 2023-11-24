import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/Header';
import {
  createPass,
  createPassText,
  createPassValidation,
  createConPassValidation,
  confirm,
  _blankPass,
  _passMinValidation,
  _passWithValidation,
  _blankConPass,
} from '../../Constant/AllStrings';
import TextView from '../../Components/TextView';
import Button from '../../Components/Button';
import {leftArrow} from '../../Assets';
import InputFields from '../../Components/InputFields';
import CommonStyles from '../../Helper/CommonStyles';
import {passwordPattern} from '../../Helper/Regex';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CreatePassword = ({navigation}) => {
  const [password, setPassword] = useState({value: '', err: ''});
  const [confirmPassword, setConfirmPassword] = useState({value: '', err: ''});

  const validatePassword = password => {
    // Implement your password validation logic
    if (password.value == '') return _blankPass;
    if (password.value.length <= 8) return _passMinValidation;
    if (!passwordPattern.test(password.value)) return _passWithValidation;
    return null;
  };

  const validateConfirmPassword = confirmPassword => {
    // Implement your password validation logic
    if (confirmPassword.value == '') return _blankConPass;
    if (password.value !== confirmPassword.value) {
      return createConPassValidation;
    }

    return null;
  };

  const _handleConfirm = () => {
    if (password.value == '') {
      setPassword({value: '', err: validatePassword(password)});
      flag = false;
    } else if (password.value.length < 8) {
      setPassword({value: password.value, err: validatePassword(password)});
      flag = false;
    } else if (!password.value.match(passwordPattern)) {
      setPassword({value: password.value, err: validatePassword(password)});
      flag = false;
    } else if (confirmPassword.value == '') {
      setConfirmPassword({
        value: '',
        err: validateConfirmPassword(confirmPassword),
      });
    } else if (password.value !== confirmPassword.value) {
      setConfirmPassword({
        value: confirmPassword.value,
        err: validateConfirmPassword(confirmPassword),
      });
    } else {
      navigation.navigate('Verification');
    }
  };

  return (
    <KeyboardAwareScrollView style={{backgroundColor: '#1F043B'}}>
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
            {createPass}
          </TextView>
          <TextView
            color="#BDB3C7"
            fontWeight={400}
            fontSize={14}
            alignSelf="left"
            textAlign="left"
            marginHorizontal={15}
            marginTop={30}>
            {createPassText}
          </TextView>
          <View style={{marginTop: 15}}>
            <InputFields
              placeholder="Password"
              isChecked
              passwordIcon
              SecureTextEntrys={true}
              value={password.value}
              validate={validatePassword(password)}
              validationMessage={password.err}
              onChangeText={e => setPassword({value: e, err: ''})}
            />
            {/* <TextView
            fontWeight={400}
            fontSize={13}
            alignSelf="left"
            textAlign="left"
            marginHorizontal={15}
            marginTop={2}
            color="#BDB3C7">
            {createPassValidation}
          </TextView> */}
          </View>
          <View style={{marginTop: 5}}>
            <InputFields
              placeholder="Confirm Password"
              isChecked
              passwordIcon
              SecureTextEntrys={true}
              value={confirmPassword.value}
              validate={validateConfirmPassword(confirmPassword)}
              validationMessage={confirmPassword.err}
              onChangeText={e => setConfirmPassword({value: e, err: ''})}
            />
            {/* <TextView
            fontWeight={400}
            fontSize={13}
            alignSelf="left"
            textAlign="left"
            marginHorizontal={15}
            color="#BDB3C7"
            marginTop={2}>
            {createConPassValidation}
          </TextView> */}
          </View>
          <Button
            borderWidth={0}
            onClick={() => _handleConfirm()}
            btnName={confirm}
            broderRadius={5}
            marginTop={25}
          />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({});
