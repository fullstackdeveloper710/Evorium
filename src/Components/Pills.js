import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
const Pills = ({category_name, onPress}) => {
  const [active, setActive] = useState(false);
  return (
    <TouchableOpacity
     
      disabled={true}
      onPress={
        (() => {
          setActive(!active);
        },
        onPress)
      }>
      <Text style={styles.categoryName}>{category_name}</Text>
    </TouchableOpacity>
  );
};
export default Pills;

const styles = StyleSheet.create({
  pillContainerNotSelected: {
    backgroundColor: '#1F043B',
    borderColor: 'whitesmoke',
    borderWidth: 1,

    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 5,
  },
  categoryName: {
    textAlign: 'center',
    color: 'whitesmoke',
  },
  pillContainerSelected: {
    backgroundColor: '#AE00FF',
    borderColor: 'whitesmoke',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 5,
  },
});
