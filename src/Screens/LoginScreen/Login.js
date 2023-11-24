import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Platform,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Constant/dimensions';
import {
  appleImg,
  blankCheck,
  facebookImg,
  fillCheckBox,
  googleImg,
  loginTrue,
  passImg,
  showEyeIcon,
  splashtextImg,
} from '../../Assets';
import TextView from '../../Components/TextView';
import {
  ForgotPassword,
  newUser,
  welcomeUser,
  alreadyAccount,
  RememberMe,
  LoginText,
  _blankEmail,
  _blankPass,
  _checkEmailWifValidation,
  _passMinValidation,
  _passWithValidation,
} from '../../Constant/AllStrings';
import CommonStyles from '../../Helper/CommonStyles';
import InputFields from '../../Components/InputFields';
import Button from '../../Components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {emailPattern, passwordPattern} from '../../Helper/Regex';
import ApiClient from '../../api/apiClient';
import {API_LOGIN} from '../../api/apiUrl';
import axios from 'axios';
import Loading from '../../Components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState({
    value: '',
    err: '',
  });

  const [password, setPassword] = useState({value: '', err: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  useEffect(() => {
    // Check if the "Remember Me" option is set in AsyncStorage
    AsyncStorage.getItem('rememberMe').then(rememberMe => {
      if (rememberMe === 'true') {
        // Retrieve and set the stored email and password
        AsyncStorage.getItem('userEmail').then(email => {
          setEmail({value: email, err: ''});
        });
        AsyncStorage.getItem('userPassword').then(password => {
          setPassword({value: password, err: ''});
        });
        setRememberMe(true); // Set the "Remember Me" checkbox as checked
      }
    });
  }, []);

  const validateEmail = email => {
    // Implement your email validation logic
    if (email.value == '') return _blankEmail;
    if (!emailPattern.test(email.value)) return _checkEmailWifValidation;
    return null;
  };

  const validatePassword = password => {
    // Implement your password validation logic
    if (password.value == '') return _blankPass;
    if (password.value?.length <= 8) return _passMinValidation;
    if (!passwordPattern.test(password.value)) return _passWithValidation;
    return null;
  };

  const _loginFunction = async () => {
    if (email.value == '') {
      setEmail({value: '', err: validateEmail(email)});
      flag = false;
    } else if (!email.value.match(emailPattern)) {
      setEmail({value: email.value, err: validateEmail(email)});
      flag = false;
    } else if (password.value == '') {
      setPassword({value: '', err: validatePassword(password)});
      flag = false;
    } else if (password.value?.length < 8) {
      setPassword({value: password.value, err: validatePassword(password)});
      flag = false;
    } else if (!password.value.match(passwordPattern)) {
      setPassword({value: password.value, err: validatePassword(password)});
      flag = false;
    } else {
      // const data = {email: 'vipinthakur21@gmail.com', password: 'Vipin@123'};
      // const res = await axios.post('http://api.evorium.xyz/user/login', data);
      // console.log('login successful!', res);

      setIsLoading(true);
      const data = {email: email.value, password: password.value};
      const res = await ApiClient.post(API_LOGIN, data);
      console.log('response of api login--', JSON.stringify(res.data));
      if (res?.status == 200) {
        await AsyncStorage.setItem('AccessToken', res?.data?.access_token);
        await AsyncStorage.setItem('ReffToken', res?.data?.refresh_token);
        await AsyncStorage.setItem('User_ID', res?.data?.user_id);
        if (rememberMe) {
          await AsyncStorage.setItem('rememberMe', 'true');
          await AsyncStorage.setItem('userEmail', email.value);
          await AsyncStorage.setItem('userPassword', password.value);
        } else {
          // If "Remember Me" is not selected, clear the stored information
          // AsyncStorage.removeItem('rememberMe');
          // AsyncStorage.removeItem('userEmail');
          // AsyncStorage.removeItem('userPassword');
          setEmail({value: '', err: ''});
          setPassword({value: '', err: ''});
        }
        navigation.navigate('Home');
        setIsLoading(false);
      } else {
        alert(res?.data?.message);
        setIsLoading(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // console.log(rememberMe);

  return (
    <KeyboardAwareScrollView style={{backgroundColor: '#1F043B'}}>
      <Modal animated={true} transparent={true} visible={isLoading}>
        <Loading />
      </Modal>

      <SafeAreaView>
        <View style={CommonStyles.container}>
          <Image source={splashtextImg} style={CommonStyles.textImgSty}></Image>
          <TextView
            fontWeight={700}
            fontSize={20}
            marginTop={SCREEN_HEIGHT / 20}>
            {welcomeUser}
          </TextView>
          <View style={{marginTop: 15}}>
            <InputFields
              placeholder="Email"
              isChecked
              value={email.value}
              validate={validateEmail(email)}
              onChangeText={e => setEmail({value: e, err: ''})}
              validationMessage={email.err}
              source={loginTrue}
              disabled={true}
            />
            <InputFields
              placeholder="Password"
              SecureTextEntrys={showPassword}
              isChecked
              value={password.value}
              validate={validatePassword(password)}
              validationMessage={password.err}
              onChangeText={e => setPassword({value: e, err: ''})}
              iconPress={() => togglePasswordVisibility()}
              source={showPassword ? showEyeIcon : passImg}
            />
          </View>
          <View style={CommonStyles.blankCheckBoxSty}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => toggleRememberMe()}>
                <Image
                  source={rememberMe === true ? fillCheckBox : blankCheck}
                  style={CommonStyles.blankCheckSty}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TextView
                // onPress={() =>
                //   navigation.navigate('Home', {userLogin: 'userLogin'})
                // }
                color={'#BDB3C7'}
                alignSelf="left"
                left={5}>
                {RememberMe}
              </TextView>
            </View>
            <TextView
              color={'#BDB3C7'}
              alignSelf="left"
              onPress={() => navigation.navigate('ResetPassword')}>
              {ForgotPassword}
            </TextView>
          </View>
          <Button
            borderWidth={0}
            btnName={LoginText}
            broderRadius={5}
            marginTop={15}
            onClick={() => _loginFunction()}
          />

          {/* <TextView
         
            onPress={() => navigation.navigate('Signup')}>
           
          </TextView> */}

          <View style={[CommonStyles.textWithBold, {marginTop: 20}]}>
            <TextView color="#BDB3C7"> {newUser}</TextView>
            <TextView
              onPress={() => navigation.navigate('Signup')}
              fontWeight="700">
              {' '}
              Sign up
            </TextView>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Login;
