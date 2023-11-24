import {StyleSheet, Text, View, Image, Button, Touchable} from 'react-native';
import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Orientation from 'react-native-orientation-locker';
import {videoPlayIcon} from '../Assets';

const CustomViewPlayer = (props, ref) => {
  const {video_url, ViewVideo, seekToTimestamp, addToRecent, pausedVaulue} =
    props;
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [durations, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(pausedVaulue);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('cover');

  React.useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  

  const convertTimeToSeconds = time => {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 3600 + parseInt(minutes) * 60;
  };

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

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    // setCurrentTime(durations);
    console.log(durations);

    // setPlayerState(PLAYER_STATES.ENDED)
  };

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
 
    videoPlayer.current.seek(seek);
  };

  useImperativeHandle(ref, () => ({
    onSeek,
  }));

  const onPaused = playerState => {
    //Handler for Video Pause
  
    setPaused(!paused);
    ViewVideo();

    if (playerState === 1) {
     

      addToRecent(currentTime);
    }
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);

    videoPlayer.current.seek(currentTime);
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

  const onSeeking = currentTime => {
   
    setCurrentTime(currentTime);
  };

  return (
    <View>
      <Video
        controls={false}
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        muted={false}
        repeat={true}
        source={{
          uri: video_url,
        }}
        style={styles.mediaPlayer}
        volume={10}
      />

      <MediaControls
        duration={durations}
        isLoading={isLoading}
        mainColor="#333"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        toolbar={renderToolbar()}
      />
    </View>
  );
};

export default forwardRef(CustomViewPlayer);

const styles = StyleSheet.create({
  toolbar: {
    marginTop: 30,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 270,
    // flex: 1,
    // position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
  },
});
