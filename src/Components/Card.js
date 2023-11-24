import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
// import Video from 'react-native-video-player';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Orientation from 'react-native-orientation-locker';

const Card = ({
  video_title,
  video_thumbnails,
  author,
  duration,
  views,
  handleCard,
  free,
  pro,
  courseType,
}) => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [durations, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('cover');

  React.useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

 
  const onProgress = data => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = data => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const handleVolumeUp = () => {
    if (volume < 1.0) {
      // Increase the volume by a certain step (e.g., 0.1)
      setVolume(volume + 1);
    }
  };

  const handleVolumeDown = () => {
    if (volume > 0.0) {
      // Decrease the volume by a certain step (e.g., 0.1)
      setVolume(volume - 1);
    }
  };

  const onSeek = seek => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = playerState => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onError = () => alert('Oh! ', error);

  const exitFullScreen = () => {
    alert('Exit full screen');
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = currentTime => setCurrentTime(currentTime);



  return (
    <TouchableOpacity onPress={handleCard} style={styles.cardContainer}>
      <Image
        source={{
          uri:
            video_thumbnails == undefined
              ? 'https://i.ytimg.com/vi/AzmN9cV-qtQ/maxresdefault.jpg'
              : video_thumbnails,
        }}
        style={styles.video_thumbnail}
      />

   

      {courseType === 'free' && (
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
              marginTop: 5,
              fontWeight: '600',
            },
          ]}>
          {'Free'}
        </Text>
      )}
      {courseType === 'Paid' && (
        <Text
          style={[
            styles.videoTitle,
            {
              marginTop: 5,
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
      )}
      <View style={styles.video_informaiton}>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.videoTitle}>{video_title}</Text>

        <View style={styles.views_duration}>
          <View style={styles.durationContainer}>
            <Text style={styles.duration}>{duration}</Text>
          </View>

          <View style={styles.viewsContainer}>
            <Text style={styles.views}>
              {views}
              <Text
                style={{
                  fontSize: 12,
                }}>
                {' '}
                views
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  viewsContainer: {
    marginTop: 17,
    marginLeft: 10,
  },
  durationContainer: {
    marginTop: 10,
    justifyContent: 'center',
    height: 30,
    width: 60,
    borderColor: 'whitesmoke',
    borderWidth: 1,
    borderRadius: 8,
  },
  views_duration: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  video_informaiton: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  cardContainer: {
    borderRadius: 8,
    flex: 1,
    backgroundColor: '#2E1853',
    height: 270,
    width: 200,
    marginTop: 10,
    marginLeft: 15,
    // paddingBottom: 15,
  },
  video_thumbnail: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 130,
    width: '100%',
  },
  author: {
    color: '#B7B9D2',
    fontFamily: 'Aeonik',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 15,
  },
  videoTitle: {
    color: '#FFF',
    fontFamily: 'Aeonik',
    fontWeight: '500',
    fontSize: 16,
  },
  duration: {
    color: '#FFFFFF',
    fontFamily: 'Aeonik',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
  },
  views: {
    color: '#808191',
    fontFamily: 'Aeonik',
    fontWeight: '400',
    fontSize: 14,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 130,
    // flex: 1,
    // position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
  },
});
