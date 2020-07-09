import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, TouchableOpacity, Alert} from 'react-native';
import {Base64} from 'js-base64';

const Lock = ({navigation}) => {
  const [password, setPassword] = useState(null);
  const hardcodePassword = 'abc123';

  const onPressEnterPassword = async () => {
    const encryptPassword = Base64.encode(password);
    const hardcodeEncryptedPassword = Base64.encode(hardcodePassword);
    if (encryptPassword === hardcodeEncryptedPassword) {
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Password Incorrect!');
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
      <Text style={{alignSelf: 'center', paddingBottom: 8}}>{"Password"}</Text>
      <TextInput value={password}
                 onChangeText={value => setPassword(value)}
                 textAlign={'center'}
                 style={{alignSelf: 'center', borderWidth: 1, borderColor: 'grey', width: '50%', height: 30}}
      />
      <TouchableOpacity style={{alignSelf: 'center', width: '50%', paddingTop: 8}} onPress={onPressEnterPassword}>
        <Text style={{alignSelf: 'center'}}>{"Enter"}</Text>
      </TouchableOpacity>
    </View>
  );
}
export default Lock;

