import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MyProgramsText} from '../../Constant/AllStrings';
import Header from '../../Components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {leftArrow, videoThumbnail} from '../../Assets';
import {video_data} from '../../DB/database';
import PopularCard from '../../Components/PopularCard';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Constant/dimensions';
import ApiClient from '../../api/apiClient';
import {API_MyProgram} from '../../api/apiUrl';
import moment from 'moment';
const MyProgram = ({navigation}) => {
  const [data, setData] = useState([
    {
      id: 1,
      author: 'Andy William',
      video_title: 'Basic: how to ride your skateboard comfortly',
      duration: '7 min',
      views: '32K',
      thumbnail: videoThumbnail,
      type: 'free',
    },
    {
      id: 2,
      author: 'Andy William',
      video_title: 'Basic: how to ride your skateboard comfortly',
      duration: '7 min',
      views: '32K',
      thumbnail: videoThumbnail,
      type: 'free',
    },
  ]);

  useEffect(() => {
    getMyProgram();
  }, []);

  const getMyProgram = async () => {
    const data = {};
    const res = await ApiClient.get(API_MyProgram, data, global.token);

    if (res.status === 200) {
      setData(res.data.data);
    } else {
      console.log('-mmmy Program Api --', JSON.stringify(res.data.message));
    }
  };

  const renderItem = ({item}) => {
    const duration = moment.duration(item?.video_duration, 'seconds');
    const hours = duration.hours();
    const minutes = duration.minutes();
    const sec = duration.seconds();
    return (
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 10,
          paddingBottom: Platform.OS === 'android' ? 3 : null,
        }}>
        {console.log(item)}
        <PopularCard
          handlePopularCard={() => {
            navigation.navigate('VideoPlayer', {
              itemData: item,
            });
          }}
          author={item.speaker}
          duration={hours + ':' + minutes + ':' + sec}
          video_title={item.title}
          video_thumbnail={{uri: item.thumbnail_url}}
          views={item.view_count}
          Available
        />
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View style={{height: '100%', backgroundColor: '#1F043B'}}>
        <Header
          iconName={leftArrow}
          headingText={MyProgramsText}
          fontSize={18}
          fontWeight={700}
          color={'#FFF'}
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

        {/* <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic">
          <View style={styles.cardList}>
            {video_data?.map(item => {
              return (
                <PopularCard
                  author={item.author}
                  duration={item.duration}
                  video_title={item.video_title}
                  video_thumbnail={item.thumbnail}
                  views={item.views}
                />
              );
            })}
          </View>
        </KeyboardAwareScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default MyProgram;

const styles = StyleSheet.create({});
