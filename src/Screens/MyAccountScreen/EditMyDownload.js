import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  leftArrow,
  videoThumbnail,
  DeleteImg,
  blankCheckBox,
  fillCheckBox,
} from '../../Assets';
import PopularCard from '../../Components/PopularCard';
import Header from '../../Components/Header';
import {DownloadsText, CancelText} from '../../Constant/AllStrings';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Constant/dimensions';
import CheckBox from '@react-native-community/checkbox';
import Button from '../../Components/Button';
import CommonStyles from '../../Helper/CommonStyles';
import RNFetchBlob from 'rn-fetch-blob';
import CustomCheckbox from '../../Components/CustomCheckbox';
import Realm from 'realm';
import {Episode, Video} from '../../models/Person';

const openRealm = async () => {
  return Realm.open({
    schema: [Video, Episode],
  });
};

const EditMyDownload = ({route, navigation}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  // const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [data, setData] = useState(route.params);

  const handleCheckboxChange = (item, isChecked) => {
    // Handle checkbox state change for the corresponding item
    console.log(item, isChecked);

    // setIsChecked(isChecked);
    const updatedSelection = [...selectedItems];

    if (updatedSelection.includes(item)) {
      updatedSelection.splice(updatedSelection.indexOf(item), 1);
    } else {
      updatedSelection.push(item);
    }

    setSelectedItems(updatedSelection);
  };

  const renderItem = ({item}) => (
   
    <CustomCheckbox
      item={item}
      onChanges={isChecked => handleCheckboxChange(item, isChecked)}
    />
  );
  const _deleteDownloasFiles = () => {
    navigation.goBack();
  };

  const handleDeleteFiles = async () => {
    try {
      for (const selectedItem of selectedItems) {
        await deleteVideo(selectedItem._id);
        // console.log('---id---', selectedItem._id);
      }
      setSelectedItems([]);
      // Optionally, you can refresh your data after deletion
      // Refresh your data using the appropriate method (e.g., fetch updated data)
      // setData(updatedData);
    } catch (error) {
      console.error('Error deleting videos:', error);
    }
  };

  const deleteVideo = async personId => {
    const realm = await openRealm();

    try {
      await realm.write(() => {
        const person = realm.objectForPrimaryKey('Video', personId);
        if (person) {
          realm.delete(person);
          navigation.goBack();
          console.log('Person deleted:', person);
        } else {
          console.warn('Person not found');
        }
      });
    } catch (error) {
      console.error('Error deleting person:', error);
    } finally {
      realm.close();
    }
  };

  return (
    <SafeAreaView>
      <View style={{height: '100%', backgroundColor: '#1F043B'}}>
        <Header
          iconName={leftArrow}
          headingText={DownloadsText}
          fontSize={18}
          color={'#FFF'}
          headingText2={CancelText}
          back={() => navigation.goBack()}
          editHeader={_deleteDownloasFiles}
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
          {selectedItems.length > 0 && (
            <Button
              onClick={() => handleDeleteFiles()}
              showDeleteIcon
              btnName={`Delete ${selectedItems?.length} video`}
              marginTop={15}
              borderWidth={0}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditMyDownload;

const styles = StyleSheet.create({});
