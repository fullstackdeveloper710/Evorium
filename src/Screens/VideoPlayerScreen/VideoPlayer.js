import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Constant/dimensions';
import TextView from '../../Components/TextView';
import {
  videoPlayingThumbnail,
  videoThumbnail,
  videoPlayIcon,
  downloadIcon,
  playImg,
  discordIcon,
  facebookIcon,
  instagramIcon,
  profileIcon,
  twitterIcon,
  leftArrow,
} from '../../Assets';
import PopularCard from '../../Components/PopularCard';
import moment from 'moment';
import ApiClient from '../../api/apiClient';
import {
  API_VideoViews,
  API_RecentProgram,
  API_UpdateRecentProgram,
  API_DownloadVideo,
  API_RecommendedProgram,
} from '../../api/apiUrl';
import CustomViewPlayer from '../../Components/CustomViewPlayer';
import RNFetchBlob from 'rn-fetch-blob';
import {err} from 'react-native-svg/lib/typescript/xml';
import Realm from 'realm';
import {Episode, Video} from '../../models/Person';
import PushNotification from 'react-native-push-notification';

const openRealm = async () => {
  return Realm.open({
    schema: [Video, Episode],
  });
};

const VideoPlayer = ({route, navigation, navigator}) => {
  const {
    video_size,
    thumbnail_url,
    price,
    course_type,
    tags,
    video_url,
    title,
    description,
    speaker,
    episodes,
    category,
    video_duration,
    view_count,
    _id,
    watched_till,
  
  } = route.params.itemData;


  const [downloadProgress, setDownloadProgress] = useState(0);
  const [video_data, set_Video_data] = useState([]);

  useEffect(() => {
    if (route.params.itemData?.video_id !== undefined)
      childRef.current.onSeek(watched_till);
  }, [route.params.itemData?.video_id]);

  useEffect(() => {
    showRecommendedPro();
    // Initialize notification channel
    PushNotification.createChannel(
      {
        channelId: 'download-channel',
        channelName: 'Download Channel',
        channelDescription: 'Channel for download notifications',
      },
      created => console.log(`Channel created: ${created}`),
    );
  }, []);

  const childRef = useRef();

  const [readMore, setReadMore] = useState(false);

  const convertTimeToSeconds = time => {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 3600 + parseInt(minutes) * 60;
  };

  const duration = moment.duration(
    video_duration || route.params.itemData?.video_id?.video_duration,
    'seconds',
  );
  const hr = duration.hours();
  const min = duration.minutes();
  const sec = duration.seconds();

  const ViewVideo = async () => {
    const payload = {
      userId: global.user_id,
      videoId:
        route.params.itemData?.video_id !== undefined
          ? route.params.itemData?.video_id._id
          : _id,
    };
    const res = await ApiClient.post(API_VideoViews, payload, global.token);
    if (res.status === 200) {
      alert(res.data.message);
    } else {
      console.log('video viwes ---', res.data);
    }
  };

  const addToRecent = async val => {

    const payload = {
      user_id: global.user_id,
      video_id:
        route.params.itemData?.video_id !== undefined
          ? route.params.itemData?.video_id._id
          : _id,
      watched_till: val,
    };
    const res = await ApiClient.post(API_RecentProgram, payload, global.token);
   
    if (res.status === 200) {
     
    }
    if (res.status === 401) {
      if (res.data.watched_till_updated) {
        const data = {
          user_id: global.user_id,
          video_id:
            route.params.itemData?.video_id !== undefined
              ? route.params.itemData?.video_id._id
              : _id,
          new_watched_till: val,
        };
        const res = await ApiClient.put(
          API_UpdateRecentProgram,
          data,
          global.token,
        );
   
      }
    }
  };

  const seekToTimestamp = timestamp => {
  
    const timeInSeconds = convertTimeToSeconds(timestamp); // assuming timestamps are in minutes

   

    childRef.current.onSeek(timeInSeconds);
  };

  const requestVideoPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Download Video Permission',
          message: 'Download Video App needs access to your storage ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        handleDownloadFile();
      } else {
        console.log('Download video permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const postPerson = async url => {
    const realm = await openRealm();
    console.log(realm);
    try {
      await realm.write(() => {
     
        const newPerson = realm.create('Video', {
         
          title: title || route.params.itemData?.video_id?.title,
          description:
            description || route.params.itemData?.video_id?.description,
          category: category || route.params.itemData?.video_id?.category,
          speaker: speaker || route.params.itemData?.video_id?.speaker,
          episodes: episodes || route.params.itemData?.video_id?.episodes,
          course_type:
            course_type || route.params.itemData?.video_id?.course_type,
          tags: tags || route.params.itemData?.video_id?.tags,
         
          thumbnail_url:
            thumbnail_url || route.params.itemData?.video_id?.thumbnail_url,
          video_url: url,
          video_size:
            video_size !== undefined
              ? parseInt(
                  video_size || route.params.itemData?.video_id?.video_size,
                )
              : null,
          video_duration:
            video_duration || route.params.itemData?.video_id?.video_duration,
          view_count:
            view_count !== undefined
              ? parseInt(
                  view_count || route.params.itemData?.video_id?.view_count,
                )
              : null,
          _id: _id || route.params.itemData?.video_id?._id,
        });
       
        // Show completion notification
        PushNotification.localNotification({
          channelId: 'download-channel',
          title: 'Download Complete',
          message: 'Your video has been downloaded successfully!',
        });

        setDownloadProgress(0);
      });
    } catch (error) {
      console.error('Error creating person:', error);
    } finally {
      realm.close();
    }
  };

  function handleDownloadFile() {
  
    PushNotification.localNotification({
      channelId: 'download-channel',
      title: 'Downloading Video',
      message: 'Your video is downloading...',
      progress: 1, // Set progress to 1 when download is complete
    });
    const destinationPath = RNFetchBlob.fs.dirs.DocumentDir + '/' + 'MyApp';

 
  

    const fileFullName =
      route.params.itemData?.video_id !== undefined
        ? route.params.itemData?.video_id?.video_url.match(/\/([^\/]+)$/)[1]
        : video_url.match(/\/([^\/]+)$/)[1];
   
   

    const AddVideoUrl =
      route.params.itemData?.video_id !== undefined
        ? route.params.itemData?.video_id?.video_url
        : video_url;

 

    RNFetchBlob.config({
      path: destinationPath + '/' + fileFullName,
      fileCache: true,
      notification: true,
    })
      .fetch('GET', AddVideoUrl)
      .then(async res => {
        
        postPerson(res.path());
      })
      .catch(err => console.log('error -----;', err));
  }

  

  const showRecommendedPro = async () => {
    const res = await ApiClient.get(
      API_RecommendedProgram +
        (category || route.params.itemData?.video_id?.category),
      {},
      global.token,
    );
  
    if (res.status === 200) {
      set_Video_data(res.data);
    } else console.log(res.data.message);
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={{}}>
          <View style={styles.videoPlayerContainer}>
            <CustomViewPlayer
              ref={childRef}
              video_url={
                video_url || route.params.itemData?.video_id?.video_url
              }
              ViewVideo={() => ViewVideo()}
              addToRecent={addToRecent}
              pausedVaulue={false}
            />
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{position: 'absolute'}}>
              <Image source={leftArrow} resizeMode="contain" />
            </TouchableOpacity>
            <Text
              style={[
                styles.videoTitle,
                {
                  backgroundColor: '#38383A',
                  position: 'absolute',
                  alignSelf: 'flex-end',
                  fontSize: 10,
                  padding: 5,
                  paddingHorizontal: 10,
                  right: 5,
                  borderRadius: 5,
                  fontFamily: 'Aeonik',
                  marginTop: 10,
                  fontWeight: '600',
                },
              ]}>
              {'Free'}
            </Text>
           
          </View>
          <View style={styles.videoInformation}>
            <TextView
              alignSelf={'left'}
              textAlign={'left'}
              fontSize={13}
              color={'#BDB3C7'}
              paddingLeft={10}
              paddingTop={10}>
              {speaker || route.params.itemData?.video_id?.speaker + ' '}|
              {' ' + (category || route.params.itemData?.video_id?.category)}
            </TextView>
            <TextView
              alignSelf={'left'}
              color={'#FFF'}
              fontSize={18}
              fontWeight={'600'}
              paddingLeft={10}
              paddingTop={8}
              textAlign={'left'}>
              {title || route.params.itemData?.video_id?.title}
             
            </TextView>
            <TextView
              alignSelf={'left'}
              textAlign={'left'}
              paddingLeft={10}
              paddingTop={10}
              color={'#FFF'}
              fontSize={14}
              fontWeight={'500'}>
              Description
            </TextView>
            <TextView
              alignSelf={'left'}
              paddingLeft={10}
              paddingTop={4}
              textAlign={'left'}
              fontSize={12}
              fontWeight={'300'}>
              {description || route.params.itemData?.video_id?.description}{' '}
              {!readMore ? (
                <Text
                  onPress={() => setReadMore(true)}
                  style={{
                    textDecorationLine: 'underline',
                    color: '#fff',
                    marginLeft: 10,
                    fontSize: 12,
                  }}>
                  ...read more
                </Text>
              ) : (
                <Text
                  onPress={() => setReadMore(true)}
                  style={{
                   
                    color: '#fff',
                    
                    marginLeft: 10,
                    fontSize: 12,
                  }}>
                  and this is more text which wanna see
                </Text>
              )}
            </TextView>

            <View
              style={{
                borderWidth: 0.5,
                borderColor: '#FFF',
                marginHorizontal: 8,
                marginTop: 15,
                marginVertical: 5,
              }}></View>
          </View>

          <View
            style={{
              marginTop: 10,
              marginHorizontal: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#fff',
                  borderWidth: 1,
                  borderColor: '#fff',
                  borderRadius: 5,
                  // padding: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 12,
                }}>
                {hr + ':' + min + ':' + sec /* 7 min */}
              </Text>
              <Text style={{color: '#fff', marginLeft: 10}}>
                {view_count || route.params.itemData?.video_id?.view_count}{' '}
                views
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => requestVideoPermission()}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={downloadIcon}
                style={{width: 25}}
                resizeMode="contain"
              />
              <Text style={{color: '#fff', marginLeft: 10}}>Download</Text>
            </TouchableOpacity>
          </View>

          <TextView
            alignSelf={'left'}
            paddingLeft={10}
            paddingTop={20}
            textAlign={'left'}
            fontSize={14}
            fontWeight={'500'}>
            Time Codes
          </TextView>

          {(episodes || route.params.itemData?.video_id?.episodes)?.map(
            allItem => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    seekToTimestamp(allItem.start);
                  }}>
                  <View
                    style={{
                      marginHorizontal: 15,
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 14,
                      backgroundColor: '#261148',

                      borderRadius: 5,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={playImg}
                        style={{width: 30, height: 30}}
                        resizeMode="contain"
                      />
                      <TextView
                        alignSelf={'left'}
                        paddingLeft={10}
                        textAlign={'left'}
                        fontSize={14}
                        fontWeight={'400'}>
                        {allItem.title}
                      </TextView>
                    </View>
                    <View>
                      <TextView
                        alignSelf={'left'}
                        paddingLeft={10}
                        textAlign={'left'}
                        fontSize={14}
                        fontWeight={'400'}>
                        {allItem.start}
                      </TextView>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            },
          )}

          <TextView
            alignSelf={'left'}
            paddingLeft={10}
            paddingTop={20}
            textAlign={'left'}
            fontSize={14}
            fontWeight={'500'}>
            Recommended for you
          </TextView>
          <View style={{marginBottom: -50}}>
            {video_data?.map(item => {
              
              const duration = moment.duration(
                item?.video_duration ||
                  route.params.itemData?.video_id?.video_duration,
                'seconds',
              );
              const hrs = duration.hours();
              const mins = duration.minutes();
              const secs = duration.seconds();
              if ((_id || route.params.itemData?.video_id?._id) !== item._id) {
                return (
                  <View style={{paddingHorizontal: 15}}>
                    <PopularCard
                      handlePopularCard={() =>
                        navigation.navigate('VideoPlayer', {itemData: item})
                      }
                      author={item.speaker}
                      duration={hrs + ':' + mins + ':' + secs}
                      video_title={item.title}
                      video_thumbnail={{uri: item.thumbnail_url}}
                      views={item.view_count}
                    />
                  </View>
                );
              }
            })}
          </View>
          <View style={styles.bottomlineBreak}></View>

          <View style={styles.footerContainers}>
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

        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default VideoPlayer;

const styles = StyleSheet.create({
  videoPlayerContainer: {},
  footerContainer: {
    height: 300,
    display: 'flex',
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  popularProgramsContainer: {
    // height: 340,
    backgroundColor: '#1F043B',
    marginHorizontal: 15,
  },
  scrollView: {
    marginBottom: 0,
    // flex: 1,

    backgroundColor: '#1F043B',
    // height: 800,
  },

  cardList: {},
  programsContainer: {
    width: '100%',
    height: 340,
    backgroundColor: '#1F043B',
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
    padding: 10,
    marginHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    //padding: 10,
    borderRadius: 5,
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
    marginRight: 10,
    height: 20,
    width: 20,
  },
  profileContainer: {
    paddingLeft: 16,

    paddingTop: 5,
  },
  footerContainers: {
    height: 100,
    display: 'flex',
    flexDirection: 'row',
  },
  bottomlineBreak: {
    opacity: 0.2,
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
    marginTop: 80,
  },
  videoTitle: {
    color: '#FFF',
    fontFamily: 'Aeonik',
    fontWeight: '500',
    fontSize: 16,
  },
  mediaPlayer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 250,
    // position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
  },

  video: {
    width: '100%',
    aspectRatio: 16 / 9, // You can adjust the aspect ratio
  },
  fullScreenVideo: {
    // position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  fullScreenButton: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 25,
  },
});
