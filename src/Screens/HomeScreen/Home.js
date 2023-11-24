import React, {useEffect, useRef, useState} from 'react';
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
import {
  discordIcon,
  facebookIcon,
  instagramIcon,
  profileIcon,
  searchIcon,
  startIcon,
  twitterIcon,
} from '../../Assets/index';
import Card from '../../Components/Card';
import {video_data} from '../../DB/database';
import PopularCard from '../../Components/PopularCard';
import CustomVideoPlayer from '../../Components/CustomVideoPlayer';
import {VideoModel} from '../../Components/VideoModel';
import ApiClient from '../../api/apiClient';
import {
  API_Home,
  API_RecentProgram,
  API_ShowRecentProgram,
} from '../../api/apiUrl';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = ({navigation, theme, props}) => {
  const [showModal, setShowModal] = useState({isVisible: false, data: null});
  const [freeProgramsData, setFreeProgramsData] = useState([]);
  const [proProgramsData, setProProgramsData] = useState([]);
  const [recentProgramsData, setRecentProgramsData] = useState([]);

  useEffect(async () => {
    await AsyncStorage.getItem('AccessToken')
      .then(val => {
        const facebookToken = val;
        // console.log('facebook token brandlisting', facebookToken);
        global.token = {facebookToken};
      })
      .catch(err => {
        alert(err);
      });

    await AsyncStorage.getItem('User_ID')
      .then(val => {
        global.user_id = val;
      })
      .catch(err => {
        alert(err);
      });
    getAlldata();
  }, []);


  const getAlldata = async () => {
    const data = {};
    const payload = {
      userId: global.user_id,
    };
    const res = await ApiClient.get(API_Home + 'Free', data, global.token);
    const resPro = await ApiClient.get(API_Home + 'Paid', data, global.token);
    const resRecentProgram = await ApiClient.post(
      API_ShowRecentProgram,
      payload,
      global.token,
    );
 
    if (res.status === 200) {
      setFreeProgramsData(res.data.data);
    }
    if (resPro.status === 200) {
      setProProgramsData(resPro.data.data);
    }
    if (resRecentProgram.status === 200) {
      setRecentProgramsData(resRecentProgram.data.data);
    }
  };

  const toggleModal = state => {
    setShowModal({
      isVisible: state.isVisible,
      data: state.data,
    });
  };

  return (
    <SafeAreaView>
      {showModal.isVisible ? (
        <VideoModel
          isVisible={showModal.isVisible}
          toggleModal={toggleModal}
          videoDetail={showModal.data}
          {...props}
        />
      ) : null}
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <TextView fontSize={28} fontWeight={'700'} lineHeight={41}>
              Welcome, Simon!
            </TextView>
          </View>

          <View style={styles.profileContainer}>
            <Image source={profileIcon} style={styles.profileIcon} />
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
        <View style={styles.lineBreak}></View>

        <ScrollView style={styles.scrollView}>
          {recentProgramsData?.length > 0 && (
            <View style={styles.programsContainer}>
              <TextView
                fontSize={18}
                color={'#FFFFFF'}
                textAlign={'left'}
                alignSelf={'left'}
                padding={15}
                fontWeight={'500'}>
                Your Recent Programs
              </TextView>

              <View style={styles.cardList}>
                {/* {Platform.OS == 'ios' ? ( */}
                <FlatList
                  data={recentProgramsData}
                  horizontal={true}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => {
                    // console.log('recent program api jhsjsad-----', item);
                    const duration = moment.duration(
                      item?.video_id?.video_duration,
                      'seconds',
                    );

                    const hours = duration.hours();
                    const minutes = duration.minutes();
                    // const sec = duration.seconds();
                    return (
                      <Card
                        courseType={item?.video_id?.course_type}
                        handleCard={() => {
                          // setShowModal({
                          //   isVisible: true,
                          //   data: item,
                          // });
                          navigation.navigate('VideoPlayer', {itemData: item});
                        }}
                        author={item?.video_id?.speaker}
                        duration={
                          hours + ' : ' + minutes
                          // + ' : ' + sec
                        }
                        video_title={item?.video_id?.title}
                        video_thumbnails={item?.video_id?.thumbnail_url}
                        views={item?.video_id?.view_count}
                      />
                    );
                  }}
                />
              </View>
            </View>
          )}

          <View style={styles.programsContainer}>
            <TextView
              fontSize={18}
              color={'#FFFFFF'}
              textAlign={'left'}
              alignSelf={'left'}
              padding={15}
              fontWeight={'500'}>
              Free programs
            </TextView>

            <View style={styles.cardList}>
              <FlatList
                data={freeProgramsData}
                horizontal={true}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  const duration = moment.duration(
                    item.video_duration,
                    'seconds',
                  );

                  const hours = duration.hours();
                  const minutes = duration.minutes();
                  
                  return (
                    <Card
                      courseType={item.course_type}
                      handleCard={() => {
                        
                        navigation.navigate('VideoPlayer', {itemData: item});
                      }}
                      author={item.speaker}
                      duration={
                        hours + ' : ' + minutes
                        // + ' : ' + sec
                      }
                      video_title={item.title}
                      video_thumbnails={item.thumbnail_url}
                      views={item.view_count}
                    />
                  );
                }}
              />
            </View>
          </View>

          <View style={styles.programsContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <View>
                <TextView
                  fontSize={18}
                  color={'#FFFFFF'}
                  textAlign={'left'}
                  alignSelf={'left'}
                  padding={15}
                  paddingRight={0}
                  fontWeight={'500'}>
                  Pro
                </TextView>
              </View>
              <View
                style={{
                  marginTop: 20,
                  marginLeft: 4,
                }}>
                <Image source={startIcon} />
              </View>
            </View>
            <TextView
              fontSize={18}
              color={'#FFFFFF'}
              textAlign={'left'}
              alignSelf={'left'}
              padding={15}
              paddingTop={0}
              paddingRight={0}
              fontWeight={'500'}>
              Get access to best content for only $1
            </TextView>

            <View style={styles.cardList}>
              <FlatList
                data={proProgramsData}
                horizontal={true}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  const duration = moment.duration(
                    item.video_duration,
                    'seconds',
                  );

                  const hours = duration.hours();
                  const minutes = duration.minutes();
                 
                  return (
                    <Card
                      handleCard={() => {
                       
                        navigation.navigate('PaidVideoPlayer', {
                          itemData: item,
                        });
                      }}
                      courseType={item.course_type}
                      author={item.speaker}
                      duration={hours + ' : ' + minutes}
                      video_title={item.title}
                      video_thumbnails={item.thumbnail_url}
                      views={item.view_count}
                    />
                  );
                }}
              />
            </View>
          </View>

          <View style={styles.popularProgramsContainer}>
            <View>
              <TextView
                fontSize={18}
                color={'#FFFFFF'}
                textAlign={'left'}
                alignSelf={'left'}
                padding={15}
                paddingRight={0}
                fontWeight={'500'}>
                Popular Programs
              </TextView>
            </View>

            <View style={styles.cardList}>
              {video_data?.map(item => {
                return (
                  <PopularCard
                    pro
                    author={item.author}
                    duration={item.duration}
                    video_title={item.video_title}
                    video_thumbnail={item.thumbnail}
                    views={item.views}
                  />
                );
              })}
            </View>
          </View>

          <View style={styles.bottomlineBreak}></View>

          <View style={styles.footerContainer}>
            <View
              style={{
                width: '50%',
                marginTop: 25,
                marginLeft: 20,
              }}>
              <Text
                style={{
                  color: '#BDB3C7',
                  fontFamily: 'Aeonik',
                  fontSize: 15,
                }}>
                More info on our website
              </Text>
              <Text
                style={{
                  color: '#FFF',
                  fontFamily: 'Aeonik',
                  textDecorationLine: 'underline',
                  fontSize: 17,
                  fontWeight: '500',
                  marginTop: 6,
                }}>
                evorium.com
              </Text>
            </View>
            <View
              style={{
                width: '40%',
                marginTop: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Image source={instagramIcon} />
              <Image source={twitterIcon} />
              <Image source={discordIcon} />
              <Image source={facebookIcon} />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  footerContainer: {
    height: Platform.OS === 'ios' ? 100 : 150,
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  popularProgramsContainer: {
    // height: 340,
    backgroundColor: '#1F043B',
    marginHorizontal: 15,
    top: 50,
  },
  scrollView: {
    // marginBottom: 10,
    // // flex: 1,
    // // backgroundColor: 'red',
    // // height: 200,
    marginBottom: 0,
    // flex: 1,

    backgroundColor: '#1F043B',
  },

  cardList: {},
  programsContainer: {
    width: '100%',
    height: 340,
    backgroundColor: '#1F043B',
    // backgroundColor:'red'
  },
  bottomlineBreak: {
    opacity: 0.2,
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
    marginTop: 80,
  },
  lineBreak: {
    borderBottomColor: '#AE00FF',
    borderBottomWidth: 0.5,
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
    // padding: Platform.OS == 'ios' ? 10 : 0,
  },
  container: {
    backgroundColor: '#1F043B',
    // height: SCREEN_HEIGHT,
    // width: SCREEN_WIDTH,
    height: '100%',
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
    // marginRight: 10,
    marginLeft: 10,
    height: 20,
    width: 20,
  },
  profileContainer: {
    paddingLeft: 16,

    paddingTop: 5,
  },
});
