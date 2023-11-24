import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {EditProfileText} from '../../Constant/AllStrings';
import Header from '../../Components/Header';
import {cameraImg, leftArrow, profileIcon, rightArrow} from '../../Assets';
import InputFields from '../../Components/InputFields';
import TextView from '../../Components/TextView';
import Button from '../../Components/Button';
import CountryPicker from 'react-native-country-picker-modal';
import DocumentPicker from 'react-native-document-picker';
import countryPhoneCodes from '../../utils/country-phones.json';
import ApiClient from '../../api/apiClient';
import {API_MyUpdate} from '../../api/apiUrl';

const EditProfile = ({route, navigation}) => {
  console.log(route.params.userDetail, 'jsjhdkjdhh');
  const {_id, country_code, email, full_name, phone, profile_pic} =
    route.params.userDetail;

  const [countryCode, setCountryCode] = useState('IN');
  const [country_Code, set_Country_Code] = useState('');
  const [userName, setUserName] = useState({value: full_name, err: ''});

  const [singleFile, setSingleFile] = useState(null);

  useEffect(() => {
    const info = countryPhoneCodes.filter(el => {
      return el.code === countryCode;
    });
    if (info.length > 0) {
      console.log('hksjadahsd', JSON.stringify(info));
      set_Country_Code(info[0].name);
    }
  }, [countryCode]);

  console.log('singleFile-------', singleFile);
  const updateProfile = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      // If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('full_name', userName.value);
      data.append('profile_pic', singleFile[0]);
      const res = await ApiClient.multipartput(
        API_MyUpdate,
        data,
        global.token,
      );
      console.log(data, 'update api res---', JSON.stringify(res));

      // let responseJson = await res.json();
      if (res.status === 200) {
        alert('Upload Successful');
        navigation.goBack();
      }
    } else {
      // If no file selected the show alert
      alert('Profile updated already!');
    }
  };

  const uploadImg = async () => {
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : -------' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  return (
    <SafeAreaView>
      <View style={{height: '100%', backgroundColor: '#1F043B'}}>
        <Header
          iconName={leftArrow}
          headingText={EditProfileText}
          fontSize={18}
          fontWeight={700}
          color={'#FFF'}
          back={() => navigation.goBack()}
        />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic">
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Image
              source={
                profile_pic
                  ? singleFile == null
                    ? {uri: profile_pic}
                    : {uri: singleFile[0].uri}
                  : singleFile[0].uri
              }
              resizeMode="contain"
              style={{height: 65, width: 65, borderRadius: 33}}
            />
            <TouchableOpacity onPress={() => uploadImg()}>
              <Image
                source={cameraImg}
                resizeMode="contain"
                style={{
                  height: 25,
                  width: 25,
                  top: -25,
                  left: 28,
                  // position: 'absolute',
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: '#2E1853',
              marginHorizontal: 15,
              paddingHorizontal: 10,
              paddingTop: 10,
              borderRadius: 5,
            }}>
            <TextView textAlign={'left'} alignSelf={'left'} marginLeft={10}>
              Name
            </TextView>
            {console.log(userName, '-----')}
            <InputFields
              placeholder="full name"
              value={userName.value}
              onChangeText={e => setUserName({value: e, err: ''})}
              marginTop={0}
              marginHorizontal={0}
              backgroundColor="#2E1853"
              borderWidth={0}
            />
          </View>
          <View
            style={{
              backgroundColor: '#2E1853',
              marginHorizontal: 15,
              paddingHorizontal: 10,
              paddingTop: 10,
              borderRadius: 5,
              marginTop: 15,
            }}>
            <TextView textAlign={'left'} alignSelf={'left'} marginLeft={10}>
              Email
            </TextView>
            <InputFields
              placeholder="Email"
              value={email}
              marginTop={0}
              marginHorizontal={0}
              backgroundColor="#2E1853"
              borderWidth={0}
            />
          </View>
          <View
            style={{
              backgroundColor: '#2E1853',
              marginHorizontal: 15,
              paddingHorizontal: 10,
              paddingTop: 10,
              borderRadius: 5,
              marginTop: 15,
            }}>
            <TextView textAlign={'left'} alignSelf={'left'} marginLeft={10}>
              Phone number
            </TextView>
            <InputFields
              placeholder="phone"
              value={phone}
              marginTop={0}
              marginHorizontal={0}
              backgroundColor="#2E1853"
              borderWidth={0}
            />
          </View>
          {/* <View
            style={{
              backgroundColor: '#2E1853',
              marginHorizontal: 15,
              paddingHorizontal: 10,
              paddingTop: 10,
              borderRadius: 5,
              marginTop: 15,
            }}>
            <TextView textAlign={'left'} alignSelf={'left'} marginLeft={10}>
              Password
            </TextView>
            <InputFields
              placeholder="Email"
              value={'Simon Black'}
              marginTop={0}
              marginHorizontal={0}
              backgroundColor="#2E1853"
              borderWidth={0}
            />
          </View> */}
          <View
            style={{
              backgroundColor: '#2E1853',
              marginHorizontal: 15,
              paddingHorizontal: 10,
              paddingTop: 10,
              borderRadius: 5,
              marginTop: 15,
            }}>
            <TextView textAlign={'left'} alignSelf={'left'} marginLeft={10}>
              Country
            </TextView>
            <View
              style={{flexDirection: 'row', alignItems: 'center', left: 10}}>
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

              <InputFields
                placeholder="Email"
                value={country_Code}
                marginTop={0}
                marginHorizontal={0}
                backgroundColor="#2E1853"
                borderWidth={0}
              />
            </View>
          </View>
          <Button
            btnName="Save Changes"
            marginTop={20}
            borderWidth={0}
            onClick={() => updateProfile()}
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
