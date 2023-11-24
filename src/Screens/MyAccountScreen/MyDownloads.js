

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Platform,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../Components/Header';
import {leftArrow, videoThumbnail} from '../../Assets';
import {DownloadsText, EditText} from '../../Constant/AllStrings';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Constant/dimensions';
import PopularCard from '../../Components/PopularCard';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import ApiClient from '../../api/apiClient';
import {API_DownloadVideo} from '../../api/apiUrl';
import Realm from 'realm';
import {Episode, Video} from '../../models/Person';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';

const openRealm = async () => {
  return Realm.open({
    schema: [Video, Episode],
  });
};

const MyDownloads = ({navigation}) => {
  const isFocused = useIsFocused();
  const [files, setFiles] = useState([]);
  const [videoDetail, setVideoDetails] = useState([]);


  useEffect(() => {
    // Call the function
    if (isFocused) {
      readPersons();
    }
  }, [isFocused]);

  const readPersons = async () => {
    const realm = await openRealm();
    try {
      const persons = realm.objects('Video');
      console.log('Persons in Realm:', persons);
      setVideoDetails(persons.toJSON());
    } catch (error) {
      console.error('Error reading persons:', error);
    } finally {
      realm.close();
    }
  };

  console.log(videoDetail, '------videoDetail');
  async function handleGetFileList() {
    // const path = RNFetchBlob.fs.dirs.DocumentDir + '/' + 'MyApp'; DownloadDir
    const path = RNFetchBlob.fs.dirs.DocumentDir + '/' + 'MyApp';
    console.log(path);
    await RNFetchBlob.fs
      .isDir(path)
      .then(isDir => {
        console.log('isDir', isDir);
        if (isDir == true) {
          RNFetchBlob.fs
            .lstat(path)
            .then(filesList => {
              console.log('filesList----', filesList);
              setFiles(filesList);
              // downloadVideoDetails();
            })
            .catch(e => {
              console.log('Unable to get files list', e);
            });
        }
      })
      .catch(e => {
        console.log('Error isDir', e);
      });
  }

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

  const renderItem = ({item}) => {
    const duration = moment.duration(
      item?.video_duration || route.params.itemData?.video_id?.video_duration,
      'seconds',
    );
    const hr = duration.hours();
    const min = duration.minutes();
    const sec = duration.seconds();
    console.log(item);
    return (
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 10,
          // backgroundColor: 'red',
          paddingBottom: Platform.OS === 'android' ? 3 : null,
        }}>
        {console.log('--------item-----', item)}
        <PopularCard
          handlePopularCard={() =>
            navigation.navigate('VideoPlayer', {itemData: item})
          }
          author={item.speaker}
          duration={hr + ':' + min + ':' + sec}
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
          headingText={DownloadsText}
          fontSize={18}
          color={'#FFF'}
          headingText2={EditText}
          back={() => navigation.goBack()}
          editHeader={() => navigation.navigate('EditMyDownload', videoDetail)}
        />
        <View
          style={{
            height:
              Platform.OS === 'ios' ? SCREEN_HEIGHT / 1.3 : SCREEN_HEIGHT / 1.2,
          }}>
          <FlatList
            data={videoDetail}
            renderItem={renderItem}
            keyExtractor={item => item.key}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyDownloads;

const styles = StyleSheet.create({});
