import {
  StyleSheet,
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/Header';
import {leftArrow, rightArrow, trueMarkImg} from '../../Assets';
import {LanguageText} from '../../Constant/AllStrings';
import TextView from '../../Components/TextView';
import CommonStyles from '../../Helper/CommonStyles';
import RadioButton from '../../Components/RadioButton';
import {useTranslation} from 'react-i18next';
import i18n from '../translation';
import '../translation';

const SelectLanguageScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [isChecked, setIsChecked] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Option 1');
  const [data, setData] = useState([
    {
      id: 1,
      name: 'English',
      selectTrue: 'Option 1',
      val: 'en',
    },
    {
      id: 2,
      name: 'Español',
      selectTrue: 'Option 2',
      val: 'sp',
    },
    {
      id: 3,
      name: 'Français',
      selectTrue: 'Option 3',
      val: 'fr',
    }
  ]);

  const headerLanguageConverter = async isChecked => {
   
    if (isChecked == 'en') {
      i18n.changeLanguage('en');
    
    } else if (isChecked == 'sp') {
      i18n.changeLanguage('sp');
    
      
    } else if (isChecked == 'fr') {
      i18n.changeLanguage('fr');
     
      
    }
    return;
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        headerLanguageConverter(item.val);
        setSelectedOption(item.selectTrue);
      }}
      activeOpacity={0.8}
      style={[
        CommonStyles.renderItemSty,
        {
          borderBottomWidth: 0.5,
          borderBottomColor: '#545458',
          paddingVertical: 18,
        },
      ]}>
      <TextView
        textAlign="left"
        alignSelf="left"
        fontSize={16}
        fontWeight={500}>
        {item.name}
      </TextView>
      <RadioButton selected={selectedOption === item.selectTrue} />
     
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <View style={{height: '100%', backgroundColor: '#1F043B'}}>
        <Header
          iconName={leftArrow}
          headingText={t('LanguageText')}
          fontSize={18}
          fontWeight={700}
          color={'#FFF'}
          back={() => navigation.goBack()}
        />
        <View
          style={{
            marginTop: 10,
            marginBottom: 50,
          }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            scrollEnabled={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectLanguageScreen;

const styles = StyleSheet.create({});
