import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonStyles from '../Helper/CommonStyles';
import {loginTrue, passImg} from '../Assets';
import ErrorMessage from './ErrorMessage';
const InputFields = props => {
  const {
    placeholder,
    isChecked,
    iconPress,
    value,
    onChangeText,
    validate,
    validationMessage,
    SecureTextEntrys,
    keyboardType,
    maxlength,
    source,

    disabled,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');

  const handleFocus = () => {
    setIsFocused(true);
  };

  useEffect(() => {
    setError(validationMessage);
  }, [validationMessage]);

  const handleBlur = () => {
    setError(validate);

    setIsFocused(false);
  };

  return (
    <View>
      <TextInput
        style={[
          CommonStyles.InputFiledStyle,
          isFocused && CommonStyles.focusedInput,
        ]}
        {...props}
        placeholder={placeholder}
        placeholderTextColor="#9181AD"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={SecureTextEntrys}
        keyboardType={keyboardType}
        maxLength={maxlength}
      />
      {isChecked && (
        <TouchableOpacity onPress={iconPress} disabled={disabled}>
          <Image
            source={source}
            style={CommonStyles.loginTrueImg}
            resizeMode="contain"></Image>
        </TouchableOpacity>
      )}
      {error && <ErrorMessage message={error} />}
    </View>
  );
};

export default InputFields;
