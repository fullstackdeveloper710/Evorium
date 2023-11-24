import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {leftArrow} from '../../Assets';
import {Filters} from '../../Constant/AllStrings';
import CommonStyles from '../../Helper/CommonStyles';
import Header from '../../Components/Header';
import {SCREEN_HEIGHT} from '../../Constant/dimensions';
import Button from '../../Components/Button';
import ApiClient from '../../api/apiClient';
import {API_Speaker_Category} from '../../api/apiUrl';
import CustomCheckbox from '../../Components/CustomCheckbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectFilter = ({route, navigation}) => {

  const [selectedFilters, setSelectedFilters] = useState({
    Category: [],
    Speaker: [],
    SortBy: [],
    Price: [],
  });

  useEffect(() => {
    if (route.params.selectName === 'Speaker') {
      getCategoryData('speakers');
    }
    if (route.params.selectName === 'Category') {
      getCategoryData('categories');
    }
    if (route.params.selectName === 'Sort by') {
      setData([
        {
          id: 1,
          name: 'A - Z',
          val: 'az',
        },
        {
          id: 2,
          name: 'Z - A',
          val: 'za',
        },
        {
          id: 3,
          name: 'Recent Add',
          val: 'latest',
        },
      ]);
    }
    if (route.params.selectName === 'Price') {
      setData([
        {
          id: 1,
          name: 'Low - High',
          val: 'LowToHigh',
        },
        {
          id: 2,
          name: 'High - Low',
          val: 'HighToLow',
        },
      ]);
    }
  }, []);

  const [data, setData] = useState([
    {
      id: 1,
      name: 'Sort by',
    },
    {
      id: 2,
      name: 'Category',
    },
    {
      id: 3,
      name: 'Theme',
    },
    {
      id: 4,
      name: 'Price',
    },
    {
      id: 5,
      name: 'Speaker',
    },
  ]);

  const getCategoryData = async val => {
  
    const payload = {};
    const res = await ApiClient.get(val + API_Speaker_Category, payload, '');
    
    if (res.status === 200) {
      setData(res?.data?.data);
    }
  };

  const handleCheckboxChange = (item, isChecked) => {
    // Handle checkbox state change for the corresponding item
    const {selectName} = route.params;
    // alert(selectName);
    // Use the selectName parameter to determine the filter type
    switch (selectName) {
      case 'Category':
        handleCategoryFilter(item, isChecked);
        break;
      case 'Speaker':
        handleSpeakerFilter(item, isChecked);
        break;

      case 'Sort by':
        handleShortByFilter(item, isChecked);
        break;
      case 'Price':
        handlePriceFilter(item, isChecked);
        break;

      // Add more cases for other filter types if needed
      default:
        break;
    }
  };

  const handleCategoryFilter = async (item, isChecked) => {
    
    if (isChecked == true) {
      const updatedState = {...selectedFilters};
      updatedState.Category = [...updatedState.Category, item.title];
     
      setSelectedFilters(updatedState);
      
      await AsyncStorage.setItem('Category', JSON.stringify(updatedState));
    }
  };

  const handleSpeakerFilter = async (item, isChecked) => {

    if (isChecked == true) {
      const updatedState = {...selectedFilters};
      updatedState.Speaker = [...updatedState.Speaker, item.name];
      setSelectedFilters(updatedState);
   
      // await AsyncStorage.setItem('Speaker', JSON.stringify(updatedState));
      await AsyncStorage.setItem('Speaker', JSON.stringify(updatedState));
    }
  };

  const handleShortByFilter = async (item, isChecked) => {
    if (isChecked == true) {
      const updatedState = {...selectedFilters};
      updatedState.SortBy = [...updatedState.SortBy, item.val];
      setSelectedFilters(updatedState);
     
      await AsyncStorage.setItem('SortBy', JSON.stringify(updatedState));
    }
  };

  const handlePriceFilter = async (item, isChecked) => {
    if (isChecked == true) {
      const updatedState = {...selectedFilters};
      updatedState.Price = [...updatedState.Price, item.val];
      setSelectedFilters(updatedState);
   
      await AsyncStorage.setItem('Price', JSON.stringify(updatedState));
    }
  };

 

  const renderItem = ({item}) => {

    return (
      <CustomCheckbox
        filter
        label={item.name || item.title}
        onChange={isChecked => handleCheckboxChange(item, isChecked)}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={CommonStyles.container}>
        <Header
          iconName={leftArrow}
          headingText={Filters}
          fontSize={18}
          fontWeight={700}
          color={'#ffffff'}
          headingText2="Cancel"
          back={() => navigation.goBack()}
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
   
      </View>
    </SafeAreaView>
  );
};

export default SelectFilter;
