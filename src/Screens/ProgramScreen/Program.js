import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Constant/dimensions';
import TextView from '../../Components/TextView';
import {searchIcon, filterIcon} from '../../Assets/index';
import Card from '../../Components/Card';
import {video_data} from '../../DB/database';
// import {categories} from '../../DB/category';
import Pills from '../../Components/Pills';
import ApiClient from '../../api/apiClient';
import {API_Categories} from '../../api/apiUrl';
import {useMyContext} from '../../Helper/MyContext';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Program = ({navigation}) => {
  const isFocused = useIsFocused();
  const {myData} = useMyContext();
  const [selectedTab, setSelectedTab] = useState();
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Call the function
    if (isFocused) {
      AsyncStorage.removeItem('Category');
      AsyncStorage.removeItem('Speaker');
      AsyncStorage.removeItem('SortBy');
      AsyncStorage.removeItem('Price');
    }
  }, [isFocused]);

  useEffect(() => {
    getallTages();
  }, []);

  const getallTages = async () => {
    const data = true;
    const res = await ApiClient.get(API_Categories + data);
    console.log('all category----', res);

    if (res?.status === 200) {
      setCategories(res.data.data);
    } else {
      console.log(res.data.message);
    }
  };

  const renderContent = () => {
    if (selectedTab === 'All') {
      return (
        <View style={styles.cardList}>
          <FlatList
            data={myData || video_data}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={({item, index}) => {
              console.log('recent program api jhsjsad-----', item);
              const duration = moment.duration(item?.video_duration, 'seconds');

              const hours = duration.hours();
              const minutes = duration.minutes();
              // const sec = duration.seconds();
              return (
                <Card
                  courseType={item?.course_type}
                  handleCard={() => {
                    navigation.navigate('VideoPlayer', {itemData: item});
                  }}
                  author={item?.speaker}
                  duration={
                    hours + ' : ' + minutes
                    // + ' : ' + sec
                  }
                  video_title={item?.title}
                  video_thumbnails={item?.thumbnail_url}
                  views={item?.view_count}
                />
              );
            }}
          />
        </View>
      );
    } else if (selectedTab === 'Popular') {
      console.log('popular');
    } else if (selectedTab === 'Free') {
      console.log('Free');
    } else {
      // Render content for other tabs
      // Adjust this part based on your requirements
      return (
        <View style={styles.cardList}>
          <FlatList
            data={myData || video_data}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={({item, index}) => {
              console.log('recent program api jhsjsad-----', item);
              const duration = moment.duration(item?.video_duration, 'seconds');

              const hours = duration.hours();
              const minutes = duration.minutes();
              // const sec = duration.seconds();
              return (
                <Card
                  courseType={item?.course_type}
                  handleCard={() => {
                  
                    navigation.navigate('VideoPlayer', {itemData: item});
                  }}
                  author={item?.speaker}
                  duration={
                    hours + ' : ' + minutes
                    // + ' : ' + sec
                  }
                  video_title={item?.title}
                  video_thumbnails={item?.thumbnail_url}
                  views={item?.view_count}
                />

              );
            }}
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <TextView fontSize={28} fontWeight={'700'} lineHeight={41}>
              Programs
            </TextView>
          </View>

          <View style={styles.profileContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('FilterScreen')}>
              <Image source={filterIcon} style={styles.profileIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Image source={searchIcon} style={styles.searchIcon} />
          <TextInput
            placeholderTextColor={'#9181AD'}
            style={{
              borderRadius: 4,
              fontSize: 17,
              fontFamily: 'Aeonik',
              fontWeight: '400',
              color: 'whitesmoke',
              marginLeft: 5,
              width: '90%',
            }}
            placeholder="Search"></TextInput>
        </View>

        <ScrollView style={{}}>
          <View style={styles.programsContainer}>
            <View
              style={{
                // backgroundColor: '#1F043B',
                marginHorizontal: 15,
                // backgroundColor: 'red',
                height: 70,
              }}>
              <FlatList
                horizontal={true}
                data={categories}
                keyExtractor={item => item.category_id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setActive(!active);
                      setSelectedTab(item.title);
                    }}
                  
                    style={[
                      styles.pillContainerNotSelected,
                      selectedTab === item.title &&
                        styles.pillContainerSelected,
                    ]}
                    // onPress={() => navigation.navigate('ProgramContainer')}
                  >
                    <Pills category_name={item.title} />
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={styles.cardList}>{renderContent()}</View>
         
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Program;

const styles = StyleSheet.create({
  footerContainer: {
    height: 300,
    display: 'flex',
    flexDirection: 'row',
  },
  popularProgramsContainer: {
    // height: 340,
    backgroundColor: '#1F043B',
    marginHorizontal: 15,
  },
  scrollView: {
    // flex:1,

    height: 200,
  },

  cardList: {},
  programsContainer: {
    // width: '100%',
    // height: '100%',
    backgroundColor: '#1F043B',
    marginBottom: Platform.OS === 'android' ? 70 : 160,
  },
  bottomlineBreak: {
    opacity: 0.2,
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
    marginTop: 15,
  },
  lineBreak: {
    borderBottomColor: '#AE00FF',
    borderBottomWidth: 1,
    marginTop: 15,
  },
  searchMainContainer: {
    backgroundColor: '#261148',
    width: '100%',
  },
  searchContainer: {


    backgroundColor: '#261148',
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: Platform.OS == 'ios' ? 10 : null,
  },
  container: {
    backgroundColor: '#1F043B',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  header: {
    background: '#1F043B',
    width: SCREEN_WIDTH,
    height: 52,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 3,
  },
  profileIcon: {
    height: 32,
    width: 32,
  },
  searchIcon: {
    //  padding:10,
    marginLeft: 10,
    height: 20,
    width: 20,
  },
  profileContainer: {
    paddingLeft: 16,

    paddingTop: 5,
  },
  pillContainerNotSelected: {
    backgroundColor: '#1F043B',
    borderColor: 'whitesmoke',
    borderWidth: 1,

    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 5,
  },
  pillContainerSelected: {
    backgroundColor: '#AE00FF',
    borderColor: 'whitesmoke',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 5,
  },
});
