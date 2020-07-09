import React, {useState, useEffect} from 'react';
import {View, Switch, SafeAreaView, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import storageKey from '../../constants/storageKey';

const Setting = () => {
  const [isLocked, setIsLocked] = useState();

  const onSwitchToggle = async (value) => {
    setIsLocked(value);

    //
    await AsyncStorage.setItem(
      storageKey.isPasswordLocked,
      JSON.stringify(!isLocked),
    );
  };

  const getStorageLocked = (() => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(storageKey.isPasswordLocked)
        .then((value) => resolve(JSON.parse(value)))
        .catch((error) => reject(error));
    });
  })();

  useEffect(() => {
    getStorageLocked.then((value) => setIsLocked(value));
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
        }}>
        <Text>{'Lock'}</Text>
        <Switch onValueChange={onSwitchToggle} value={isLocked} />
      </View>
    </SafeAreaView>
  );
};

export default Setting;
