import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Constant/dimensions';
import {
  appleImg,
  facebookImg,
  googleImg,
  loginTrue,
  passImg,
  showEyeIcon,
  splashtextImg,
} from '../../Assets';
import TextView from '../../Components/TextView';

import {
  signupScreen,
  continuWidth,
  signingUpPolicy,
  alreadyAccount,
  _blankName,
  _checkNameWithValidation,
  _blankEmail,
  _checkEmailWifValidation,
  _passMinValidation,
  _blankPass,
  _passWithValidation,
  _blankNumber,
  _checkNumberWithValidation,
} from '../../Constant/AllStrings';
import CommonStyles from '../../Helper/CommonStyles';
import InputFields from '../../Components/InputFields';
import Button from '../../Components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  emailPattern,
  namePattern,
  passwordPattern,
  phoneNumberPattern,
} from '../../Helper/Regex';
import ApiClient from '../../api/apiClient';
import {
  API_FacebookURL,
  API_GoogleLoginURL,
  API_USERSIGNUP,
} from '../../api/apiUrl';
import Verification from '../VerificationPassScreen/Verification';
import {
  AccessToken,
  LoginManager,
  Profile,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import CountryPicker from 'react-native-country-picker-modal';
import countryPhoneCodes from '../../utils/country-phones.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import CountryPicker from 'react-native-country-picker-modal';

const Signup = ({navigation}) => {
  const [number, setNumber] = useState({value: '', err: ''});
  const [userName, setUserName] = useState({value: '', err: ''});
  const [email, setEmail] = useState({value: '', err: ''});
  const [password, setPassword] = useState({value: '', err: ''});
  const [showPassword, setShowPassword] = useState(true);

  const [countryCode, setCountryCode] = useState('US');
  const [country_Code, set_Country_Code] = useState('');
  var facebookUserProfile;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateName = userName => {
    // Implement your email validation logic
    if (userName.value == '') return _blankName;
    if (!userName.value?.match(namePattern)) return _checkNameWithValidation;
    return null;
  };

  const validateNumber = number => {
    // Implement your phone number validation logic
    if (number.value == '') return _blankNumber;
    if (!number.value?.match(phoneNumberPattern))
      return _checkNumberWithValidation;
    return null;
  };

  const validateEmail = email => {
    // Implement your email validation logic
    if (email.value == '') return _blankEmail;
    if (!emailPattern.test(email.value)) return _checkEmailWifValidation;
    return null;
  };

  const validatePassword = password => {
    // Implement your password validation logic
    if (password.value == '') return _blankPass;
    if (password.value.length <= 8) return _passMinValidation;
    if (!passwordPattern.test(password.value)) return _passWithValidation;
    return null;
  };

  // @code of sign up button
  const _signupFunction = async () => {
    flag = true;
    if (userName.value == '') {
      setUserName({value: '', err: validateName(userName)});
      flag = false;
      // all fields are required
    } else if (!userName.value.match(namePattern)) {
      setUserName({value: userName.value, err: validateName(userName)});
      flag = false;
      // all fields are required
    } else if (number.value == '') {
      setNumber({value: '', err: validateNumber(number)});
      flag = false;
    } else if (!number.value.match(phoneNumberPattern)) {
      setNumber({value: number.value, err: validateNumber(number)});
      flag = false;
    } else if (email.value == '') {
      setEmail({value: '', err: validateEmail(email)});
      flag = false;
    } else if (!email.value.match(emailPattern)) {
      setEmail({value: email.value, err: validateEmail(email)});
      flag = false;
    } else if (password.value == '') {
      setPassword({value: '', err: validatePassword(password)});
      flag = false;
    } else if (password.value.length < 8) {
      setPassword({value: password.value, err: validatePassword(password)});
      flag = false;
    } else if (!password.value.match(passwordPattern)) {
      setPassword({value: password.value, err: validatePassword(password)});
      flag = false;
    } else {
      const data = {
        full_name: userName.value,
        email: email.value,
        password: password.value,
        country_code: country_Code,
        phone: number.value,
      };
      const res = await ApiClient.post(API_USERSIGNUP, data, '');
      console.log('signup api response----', JSON.stringify(res.data));
      if (res?.status == 200) {
        alert(res.data.message);

        navigation.navigate('Verification', {verifyData: res.data});
      } else {
        alert(res.data.message);
      }
    }
  };

  const fetchUserProfile = async accessToken => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v13.0/me?fields=email&access_token=${accessToken}`,
      );
      const userData = await response.json();

     

      const imageURL = facebookUserProfile.imageURL;
      const accessToken = imageURL.split('access_token=')[1];
      const urlImages = imageURL.split('&access_token=')[0];
      const payload = {
        access_token: accessToken,
        full_name: facebookUserProfile?.name,
        profile_pic: urlImages,
        email: userData.email,
      };
      const res = await ApiClient.post(API_FacebookURL, payload);
      console.log('facebook api data response---', res);
      if (res?.status === 200) {
        await AsyncStorage.setItem('AccessToken', res?.data?.access_token);
     
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  //Login With facebook
  const handleFacebookLogin = async () => {
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async result => {
        if (result.isCancelled) {
          console.log(
            'result.isCancelled0000000000000000000',
            result.isCancelled,
          );
        } else {
          Profile.getCurrentProfile().then(currentProfile => {
            if (currentProfile) {
              console.log('current profile____________', currentProfile);
              facebookUserProfile = currentProfile;
            }
          });

          AccessToken.getCurrentAccessToken().then(data => {
            console.log('--', data.accessToken.toString());
            fetchUserProfile(data.accessToken);
          });
        }
      },
    );
  };

  const handleGooglLogin = () => {
    GoogleSignin.configure({
      webClientId:
        '270637980335-flrubb5bh958k0dr1vvuvnaam1ekinmp.apps.googleusercontent.com',
     
    });
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          console.log('hasPlayService', hasPlayService);
          GoogleSignin.signIn()
            .then(async userInfo => {
              const payload = {
                idToken: userInfo?.idToken,
                full_name: userInfo?.user?.name,
                profile_pic: userInfo?.user?.photo,
                email: userInfo?.user?.email,
              };
              const res = await ApiClient.post(API_GoogleLoginURL, payload);

              if (res.status == 200) {
                AsyncStorage.setItem('AccessToken', res?.data?.access_token);
                AsyncStorage.setItem('ReffToken', res?.data?.refresh_token);
                AsyncStorage.setItem('User_ID', res?.data?.user_id);
                navigation.navigate('Home');
              } else {
                console.log('google login err');
              }
            })
            .catch(e => {
              console.log('1 ERROR IS: ' + JSON.stringify(e));
              alert(e);
            });
        }
      })
      .catch(e => {
        console.log('2 ERROR IS: ' + JSON.stringify(e));
      });
  };

  useEffect(() => {
    const info = countryPhoneCodes.filter(el => {
      return el.code === countryCode;
    });
    if (info.length > 0) {
      console.log('hksjadahsd', JSON.stringify(info));
      set_Country_Code(info[0].dial_code);
    }
  }, [countryCode]);

  return (
    <KeyboardAwareScrollView style={{backgroundColor: '#1F043B'}}>
      <SafeAreaView>
        <View style={[CommonStyles.container, {height: '100%', width: '100%'}]}>
          <Image source={splashtextImg} style={CommonStyles.textImgSty}></Image>
          <TextView
            fontWeight={700}
            fontSize={20}
            marginTop={SCREEN_HEIGHT / 20}>
            {signupScreen}
          </TextView>

          <View style={{marginTop: 15}}>
            <InputFields
              placeholder="Simon Black"
              isChecked
              value={userName.value}
              validate={validateName(userName)}
              onChangeText={e => setUserName({value: e, err: ''})}
              validationMessage={userName.err}
              maxlength={35}
              disabled={true}
              source={loginTrue}
            />
            <View
              style={{
                flexDirection: 'row',
                // paddingHorizontal: 15,
                width: '95%',
                backgroundColor: '#1F043B',
                marginLeft: 8,
                // flex: 1,
                alignItems: 'center',
                alignSelf: 'center',
                // justifyContent: 'space-around',
              }}>
              <View
                style={{
                  backgroundColor: '#261148',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 8,
                  top: 8,
                  borderWidth: 1,
                  borderColor: '#261148',
                  borderRadius: 8,
                  // width: '15%',
                }}>
                <CountryPicker
                  {...{
                    countryCode: countryCode,
                    withFilter: true,
                    withFlag: true,
                    withAlphaFilter: true,
                    onSelect: selected => {
                      setCountryCode(selected.cca2);
                    },
                  }}
                  visible={false}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Aeonik',
                    color: '#9181AD',
                  }}>
                  {country_Code}
                </Text>
              </View>
              <View
                style={{width: country_Code?.length >= '3' ? '75%' : '80%'}}>
                <InputFields
                  placeholder="Phone Number"
                  value={number.value}
                  validate={validateNumber(number)}
                  onChangeText={e => setNumber({value: e, err: ''})}
                  validationMessage={number.err}
                  keyboardType="phone-pad"
                  maxlength={15}
                  // width={'100%'}
                />
              </View>
            </View>
            <InputFields
              placeholder="Email"
              value={email.value}
              validate={validateEmail(email)}
              onChangeText={e => setEmail({value: e, err: ''})}
              validationMessage={email.err}
              maxlength={35}
            />
            <InputFields
              SecureTextEntrys={showPassword}
              placeholder="Password"
              value={password.value}
              validate={validatePassword(password)}
              validationMessage={password.err}
              onChangeText={e => setPassword({value: e, err: ''})}
              isChecked
              iconPress={() => togglePasswordVisibility()}
              source={showPassword ? showEyeIcon : passImg}
              maxlength={20}
            />
          </View>
          <Button
            btnName="Sign up"
            broderRadius={5}
            marginTop={25}
            borderWidth={0}
            onClick={() => _signupFunction()}
          />

          <TextView marginTop={SCREEN_HEIGHT / 20} color="#BDB3C7">
            {continuWidth}
          </TextView>
          <View style={CommonStyles.socialContainerSty}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleFacebookLogin()}>
              <Image
                source={facebookImg}
                style={CommonStyles.socialIcon}
                resizeMode="contain"></Image>
            </TouchableOpacity>
            {Platform.OS == 'ios' && (
              <Image
                source={appleImg}
                style={CommonStyles.socialIcon}
                resizeMode="contain"></Image>
            )}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleGooglLogin()}>
              <Image
                source={googleImg}
                style={CommonStyles.socialIcon}
                resizeMode="contain"></Image>
            </TouchableOpacity>
          </View>

          <TextView color="#BDB3C7" fontSize={14}>
            {signingUpPolicy} {'\n'}
          </TextView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -12,
            }}>
            <TextView
              color="#BDB3C7"
              fontSize={14}
              textDecorationLine="underline">
              Terms
            </TextView>
            <TextView color="#BDB3C7" fontSize={14}>
              {' '}
              ,{' '}
            </TextView>
            <TextView
              color="#BDB3C7"
              fontSize={14}
              textDecorationLine="underline">
              Data Policy
            </TextView>
            <TextView color="#BDB3C7" fontSize={14}>
              {' '}
              and{' '}
            </TextView>
            <TextView
              color="#BDB3C7"
              fontSize={14}
              textDecorationLine="underline">
              Cookies
            </TextView>
            <TextView color="#BDB3C7" fontSize={14}>
              {' '}
              Policy.
            </TextView>
          </View>

          <View style={CommonStyles.textWithBold}>
            <TextView color="#BDB3C7">{alreadyAccount}</TextView>
            <TextView
              onPress={() => navigation.navigate('Login')}
              fontWeight="700">
              {' '}
              Log in
            </TextView>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
