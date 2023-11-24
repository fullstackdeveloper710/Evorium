import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';

const PopularCard = ({
  video_title,
  video_thumbnail,
  author,
  duration,
  views,
  Available,
  pro,
  handlePopularCard,
}) => {
  return (
    <TouchableOpacity onPress={handlePopularCard} style={styles.mainContainer}>
      <View style={styles.videoThumbnail}>
        <Image
          source={video_thumbnail}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 8,
          }}
        />
        {pro && (
          <Text
            style={[
              styles.videoTitle,
              {
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
        {Available && (
          <Text
            style={[
              styles.videoTitle,
              {
                backgroundColor: '#22B07D',
                position: 'absolute',
                alignSelf: 'flex-end',
                fontSize: 10,
                fontWeight: '600',
                fontFamily: 'Aeonik',
                padding: 5,
                right: 5,
                borderRadius: 5,
              },
            ]}>
            {'Available'}
          </Text>
        )}
      </View>
      <View style={styles.videoInformation}>
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

export default PopularCard;

const styles = StyleSheet.create({
  viewsContainer: {
    marginTop: 17,
    marginLeft: 10,
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
  views_duration: {
    display: 'flex',
    flexDirection: 'row',
  },
  videoTitle: {
    color: '#FFF',
    fontFamily: 'Aeonik',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 4,
  },
  author: {
    color: '#B7B9D2',
    fontWeight: '400',
    fontFamily: 'Aeonik',
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
  mainContainer: {
    marginTop: 13,
    height: 100,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  videoThumbnail: {
    // backgroundColor: 'red',
    borderRadius: 8,

    width: '40%',
    marginRight: 15,
  },
  videoInformation: {
    height: '100%',
    width: '60%',
  },
});
