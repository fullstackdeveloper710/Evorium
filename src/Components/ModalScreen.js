import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, Image} from 'react-native';
import CommonStyles from '../Helper/CommonStyles';
import TextView from './TextView';
import Button from './Button';
const ModalScreen = props => {
  const {visible, Done, modalheading, modalText, mailImg, hide, modalButton} =
    props;

  return (
    <View style={CommonStyles.modalContainer}>
      <Modal
        animationType="slide" // You can customize the animation type
        transparent={true}
        visible={visible}
        onRequestClose={hide}>
        <View style={CommonStyles.modalInnerContainer}>
          <View style={styles.modalContent}>
            <Image
              source={mailImg}
              style={[
                CommonStyles.socialIcon,
                {alignSelf: 'center', padding: 0, marginVertical: -8},
              ]}
              resizeMode="contain"></Image>
            <TextView fontWeight="bold" fontSize={17} marginTop={0}>
              {modalheading}
            </TextView>
            <TextView
              fontWeight={500}
              fontSize={13}
              marginTop={15}
              color="#BDB3C7">
              {modalText}
            </TextView>
            <View style={{marginVertical: 15}}>
              <Button
                borderWidth={0}
                onClick={modalButton}
                btnName={Done}
                broderRadius={5}
                marginTop={15}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#261148',
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Android shadow
    width: '80%',
  },
});
