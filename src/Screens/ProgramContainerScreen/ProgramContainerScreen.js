import React from 'react';
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
  filterIcon,
} from '../../Assets/index';
import Card from '../../Components/Card';
import {video_data} from '../../DB/database';
import PopularCard from '../../Components/PopularCard';
import {categories} from '../../DB/category';
import Pills from '../../Components/Pills';

const ProgramContainer = () => {
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
            <Image source={filterIcon} style={styles.profileIcon} />
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

        <ScrollView style={styles.scrollView}>
          <View style={styles.programsContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <TextView
                  fontSize={18}
                  color={'#FFFFFF'}
                  textAlign={'left'}
                  alignSelf={'left'}
                  padding={15}
                  paddingBottom={5}
                  fontWeight={'500'}>
                  Free Programs
                </TextView>

                <TextView
                  fontSize={12}
                  color={'#FFFFFF'}
                  textAlign={'left'}
                  alignSelf={'left'}
                  paddingLeft={15}
                  fontWeight={'400'}>
                  Free tutorials for beginners
                </TextView>
              </View>
              <View>
                <Pills category_name={'View All'} />
              </View>
            </View>

            <View style={{}}>
              <FlatList
                data={video_data}
                horizontal={true}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <Card
                    free
                    author={item.author}
                    duration={item.duration}
                    video_title={item.video_title}
                    video_thumbnail={item.thumbnail}
                    views={item.views}
                  />
                )}
              />
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <TextView
                  fontSize={18}
                  color={'#FFFFFF'}
                  textAlign={'left'}
                  alignSelf={'left'}
                  padding={15}
                  paddingBottom={5}
                  fontWeight={'500'}>
                  Pro
                </TextView>

                <TextView
                  fontSize={12}
                  color={'#FFFFFF'}
                  textAlign={'left'}
                  alignSelf={'left'}
                  paddingLeft={15}
                  fontWeight={'400'}>
                  Get access to best content for only $1
                </TextView>
              </View>
              <View
                style={{
                  marginTop: 20,
                  marginLeft: 45,
                  position: 'absolute',
                  top: 3,
                }}>
                <Image source={startIcon} />
              </View>
              <View>
                <Pills category_name={'View All'} />
              </View>
            </View>

            <FlatList
              data={video_data}
              horizontal={true}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={styles.cardList}>
                  <Card
                    pro
                    author={item.author}
                    duration={item.duration}
                    video_title={item.video_title}
                    video_thumbnail={item.thumbnail}
                    views={item.views}
                  />
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProgramContainer;

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
 
  cardList: {
    paddingBottom: 20,
  },
  programsContainer: {
    width: '100%',
    height: '100%',
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
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: Platform.OS == 'ios' ? 10 : null,
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

    marginLeft: 10,
    height: 20,
    width: 20,
  },
  profileContainer: {
    paddingLeft: 16,

    paddingTop: 5,
  },
});
