import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {splashbgImg, splashtextImg, splashImage} from '../../Assets/index';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Constant/dimensions';
import Button from '../../Components/Button';
import {headingSplash, textSplash} from '../../Constant/AllStrings';
import TextView from '../../Components/TextView';

const Splash = ({navigation}) => {
  return (
    <ImageBackground
      source={splashbgImg}
      style={styles.bgImg}
      blurRadius={Platform.OS === 'android' ? 0 : 0}>
      <Image source={splashtextImg} style={styles.textImgStySplash}></Image>
      <Image source={splashImage} style={styles.imgageSty}></Image>
      <TextView
        // marginTop={10}
        fontSize={24}
        width={SCREEN_WIDTH / 1.3}
        fontWeight={700}
        lineHeight={27}>
        {headingSplash}
      </TextView>
      <TextView
        marginTop={15}
        fontSize={14}
        width={'80%'}
        fontWeight={400}
        lineHeight={24}>
        {textSplash}
      </TextView>
      <Button
        onClickSplash={() => navigation.navigate('Signup')}
        splasBtn
        btnName="Log in or sign up"
        marginTop={SCREEN_HEIGHT / 30}
      />
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  bgImg: {
    // height: SCREEN_HEIGHT,
    // width: SCREEN_WIDTH,
    height: '100%',
    justifyContent: 'center',
  },
  textImgStySplash: {
    resizeMode: 'cover',
    width: SCREEN_WIDTH / 3,
    height: 18.29,
    alignSelf: 'center',
  },
  imgageSty: {
    width: SCREEN_WIDTH / 1.5,
    height: SCREEN_HEIGHT / 2,
    alignSelf: 'center',
    marginTop: 20,
  },
});
