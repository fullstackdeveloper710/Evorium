import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonStyles from '../../Helper/CommonStyles';
import Header from '../../Components/Header';
import {leftArrow, rightArrow} from '../../Assets';
import {Filters} from '../../Constant/AllStrings';
import TextView from '../../Components/TextView';
import Button from '../../Components/Button';
import {SCREEN_HEIGHT} from '../../Constant/dimensions';
import ApiClient from '../../api/apiClient';
import {API_Filter} from '../../api/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {useMyContext} from '../../Helper/MyContext';

const FilterScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const {updateData} = useMyContext();
  const [filterSpeaker, setFilterSpeaker] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSortByData, setFilterSortByData] = useState('');
  const [filterPriceData, setFilterPriceData] = useState('');

  const [data, setData] = useState([
    {
      id: 1,
      name: 'Sort by',
    },
    {
      id: 2,
      name: 'Category',
    },
    // {
    //   id: 3,
    //   name: 'Theme',
    // },
    {
      id: 3,
      name: 'Price',
    },
    {
      id: 4,
      name: 'Speaker',
    },
  ]);

  useEffect(() => {
    // Call the function
    if (isFocused) {
      getArrayFromAsyncStorage();
      getSpeakerFromAsyncStorage();

      getSortByFromAsyncStorage();
      getPriceFromAsyncStorage();
    }
  }, [isFocused]);

  const getArrayFromAsyncStorage = async () => {
    try {
      // Get the string from AsyncStorage using the key
      const arrayString = await AsyncStorage.getItem('Category');

      if (arrayString !== null) {
        // Parse the string back to an array using JSON.parse
        const myArray = JSON.parse(arrayString);

        setFilterCategory(myArray.Category.toString());
      } else {
        console.log('Array not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error getting array from AsyncStorage:', error);
    }
  };

  const getSpeakerFromAsyncStorage = async () => {
    try {
      // Get the string from AsyncStorage using the key
      const arrayString = await AsyncStorage.getItem('Speaker');

      if (arrayString !== null) {
        // Parse the string back to an array using JSON.parse
        const myArray = JSON.parse(arrayString);

        setFilterSpeaker(myArray.Speaker.toString());
      } else {
        console.log('Array not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error getting array from AsyncStorage:', error);
    }
  };

  const getSortByFromAsyncStorage = async () => {
    try {
      // Get the string from AsyncStorage using the key
      const arrayString = await AsyncStorage.getItem('SortBy');
      if (arrayString !== null) {
        // Parse the string back to an array using JSON.parse
        const myArray = JSON.parse(arrayString);
     
        setFilterSortByData(myArray.SortBy.toString());
      } else {
        console.log('Array not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error getting array from AsyncStorage:', error);
    }
  };

  const getPriceFromAsyncStorage = async () => {
    try {
      // Get the string from AsyncStorage using the key
      const arrayString = await AsyncStorage.getItem('Price');
      if (arrayString !== null) {
        // Parse the string back to an array using JSON.parse
        const myArray = JSON.parse(arrayString);
        setFilterPriceData(myArray.Price.toString());
      } else {
        console.log('Array not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error getting array from AsyncStorage:', error);
    }
  };

 
  const _showFilter = async () => {
    const payload = {};
    const res = await ApiClient.get(
      API_Filter +
        `?categories=${filterCategory}&speakers=${filterSpeaker}&sort_by=${filterSortByData}&price=${filterPriceData}`,
      payload,
      global.token,
    );
  
    if (res.status === 200) {
      updateData(res?.data?.data);
      navigation.goBack();
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('SelectFilter', {selectName: item.name})
      }
      activeOpacity={0.8}
      style={CommonStyles.renderItemSty}>
      <TextView
        textAlign="left"
        alignSelf="left"
        fontSize={16}
        fontWeight={500}>
        {item.name}
      </TextView>
      <Image
        source={rightArrow}
        style={CommonStyles.rightArrowSty}
        resizeMode="contain"></Image>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <View style={CommonStyles.container}>
        <Header
          back={() => navigation.goBack()}
          iconName={leftArrow}
          headingText={Filters}
          fontSize={18}
          fontWeight={700}
          color={'#ffffff'}
        />
        <View
          style={{
            height:
              Platform.OS === 'ios' ? SCREEN_HEIGHT / 1.3 : SCREEN_HEIGHT / 1.2,
          }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.key}
          />
        </View>

        <Button
          btnName="Show results"
          borderWidth={0}
          onClick={() => _showFilter()}
        />
      </View>
    </SafeAreaView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({});
