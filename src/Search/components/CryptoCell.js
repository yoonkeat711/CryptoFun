import React  from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CryptoCell = React.memo(({symbol, name, index}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: index % 2 === 1 ? 'white' : '#F0F8FF',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
      }}>
      <Text style={{width: 50}}>{index}</Text>
      <Text style={{flex: 1, textAlign: 'left'}} numberOfLines={1}>
        {symbol.toUpperCase()}
      </Text>
      <Text style={{flex: 3, textAlign: 'left'}} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
});

export default CryptoCell;
