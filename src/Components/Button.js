import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SCREEN_HEIGHT} from '../Constant/dimensions';
import {DeleteImg} from '../Assets';

const Button = props => {
  const {btnName, splasBtn, onClick, onClickSplash, showDeleteIcon, disabled} =
    props;
  if (splasBtn) {
    return (
      <LinearGradient
        colors={['#AE01FF', '#EA5C84', '#FCC604']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={[styles.linearGradients, {...props}]}>
        <TouchableOpacity onPress={onClickSplash}>
          <Text style={styles.buttonText}>{btnName}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  } else {
    return (
      <View style={[styles.allButtonSty, {...props}]}>
        <TouchableOpacity
          onPress={onClick}
          style={{flexDirection: 'row', justifyContent: 'center'}}
          disabled={disabled}>
          {showDeleteIcon && (
            <View
              style={{
                // marginLeft: Platform.OS === 'ios' ? 70 : 78,
                // top: 10,
                // position: 'absolute',
                // justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Image
                source={DeleteImg}
                resizeMode="contain"
                style={{width: 20, height: 20}}
              />
            </View>
          )}
          <Text style={styles.buttonText}>{btnName}</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default Button;

const styles = StyleSheet.create({
  linearGradients: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: SCREEN_HEIGHT / 3,
    marginHorizontal: 20,
    borderWidth: 0.1,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Aeonik',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  allButtonSty: {
    backgroundColor: '#AE00FF',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginHorizontal: 15,
    borderWidth: 0.1,
  },
});
