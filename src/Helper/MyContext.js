// MyContext.js
import React, {createContext, useContext, useState} from 'react';

const MyContext = createContext();

export const MyProvider = ({children}) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [myData, setMyData] = useState(null);

  const handleButtonPress = () => {
    setIsButtonPressed(!isButtonPressed);
  };

  const updateData = newData => {
    setMyData(newData);
  };

  const contextValue = {
    isButtonPressed,
    handleButtonPress,
    updateData,
    myData,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
