import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
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
  searchIcon,
  startIcon,
  twitterIcon,
  leftArrow,
} from '../../Assets';

import {video_data} from '../../DB/database';
import PopularCard from '../../Components/PopularCard';
import TextView from '../../Components/TextView';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Constant/dimensions';
import Button from '../../Components/Button';
import moment from 'moment';
import CustomViewPlayer from '../../Components/CustomViewPlayer';

const PaidVideoPlayer = ({route, navigation}) => {
  const {
    price,
    video_url,
    thumbnail_url,
    title,
    description,
    speaker,
    episodes,
    category,
    video_duration,
    view_count,
    _id,
  } = route.params.itemData;
  console.log('route.params.itemData----', route.params.itemData);

  const childRef = useRef();

  const [readMore, setReadMore] = useState(false);

  const duration = moment.duration(video_duration, 'seconds');
  const hr = duration.hours();
  const min = duration.minutes();
  const sec = duration.seconds();

  const convertTimeToSeconds = time => {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 3600 + parseInt(minutes) * 60;
  };

  const seekToTimestamp = timestamp => {
    // Calculate the time in seconds and seek to that point in the video
    const timeInSeconds = convertTimeToSeconds(timestamp); // assuming timestamps are in minutes

   

    childRef.current.onSeek(timeInSeconds);
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={styles.videoPlayerContainer}>
          
          <CustomViewPlayer
            ref={childRef}
            video_url={video_url}
            ViewVideo={() => {}}
            addToRecent={() => {}}
            pausedVaulue={true}
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
                marginTop: 10,
                backgroundColor: '#AE00FF',
                position: 'absolute',
                alignSelf: 'flex-end',
                fontSize: 10,
                fontWeight: '600',
                fontFamily: 'Aeonik',
                paddingVertical: 4,
                paddingHorizontal: 10,
                right: 5,
                borderRadius: 5,
              },
            ]}>
            {'Pro'}
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
            {/* Andy William | Interface, Experience */}
            {speaker + ' | ' + category}
          </TextView>
          <TextView
            alignSelf={'left'}
            color={'#FFF'}
            fontSize={18}
            fontWeight={'600'}
            paddingLeft={10}
            paddingTop={8}
            textAlign={'left'}>
            {title}
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
            {description}{' '}
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
              // borderWidth: 0.5,
              // borderColor: '#FFF',
              // marginHorizontal: 8,
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
              {hr + ' : ' + min + ' : ' + sec /* 7 min */}
            </Text>
            <Text style={{color: '#fff', marginLeft: 10}}>
              {view_count} views
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={downloadIcon}
              style={{width: 25}}
              resizeMode="contain"
            />
            <Text style={{color: '#fff', marginLeft: 10}}>Download</Text>
          </View>
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

        {episodes?.map(allItem => {
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
        })}
       
        <Button
          onClick={() => navigation.navigate('Payment', {_id, price})}
          btnName={`Buy for $ ${price}`}
          marginVertical={20}
          padding={2}
          marginHorizontal={15}
          borderWidth={0}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaidVideoPlayer;

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
    height: '100%',
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
});
