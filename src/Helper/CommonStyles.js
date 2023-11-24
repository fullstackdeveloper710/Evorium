import {Platform, StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../Constant/dimensions';

export default CommonStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1F043B',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  textImgSty: {
    resizeMode: 'cover',
    marginTop: SCREEN_HEIGHT / 8,
    width: SCREEN_WIDTH / 3,
    height: 18.29,
    alignSelf: 'center',
  },
  InputFiledStyle: {
    backgroundColor: '#261148',
    // height: Platform.OS == 'ios' ? SCREEN_HEIGHT / 20 : SCREEN_HEIGHT / 16,
    height: 45,
    fontSize: 16,
    // padding: SCREEN_HEIGHT / 70,
    padding: 10,
    marginHorizontal: 15,
    paddingLeft: 10,
    // marginTop: SCREEN_HEIGHT / 50,
    marginTop: 15,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#261148',
    borderRadius: 5,
  },
  focusedInput: {
    borderColor: '#AE00FF',
    borderWidth: 1,
  },
  loginTrueImg: {
    height: 20,
    width: 20,
    position: 'absolute',
    marginHorizontal: 15,
    alignSelf: 'flex-end',
    marginTop: -33,

    right: 10,
  },
  socialIcon: {
    height: SCREEN_HEIGHT / 7,
    width: SCREEN_WIDTH / 7,
    // size: 100,
  },
  socialContainerSty: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: Platform.OS == 'ios' ? SCREEN_WIDTH / 2 : SCREEN_WIDTH / 3,
    alignItems: 'center',
    alignSelf: 'center',
  },
  blankCheckSty: {
    width: SCREEN_WIDTH / 19,
    height: SCREEN_HEIGHT / 19,
  },
  blankCheckBoxSty: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#1F043B',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  rightArrowSty: {
    width: SCREEN_WIDTH / 15,
    height: SCREEN_HEIGHT / 15,
  },
  renderItemSty: {
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 1,
  },
  viewContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#2E1853',
    padding: 18,
    borderRadius: 10,
  },
  toggleButtonSty: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#545458',
    paddingVertical: 18,
  },
  textWithBold: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  checkboxInner: {
    width: 22,
    height: 22,
    backgroundColor: '#AE00FF',
    borderRadius: 5,
    // borderWidth: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
