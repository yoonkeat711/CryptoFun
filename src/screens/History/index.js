import React, {useState} from 'react';
import {connect} from 'react-redux';
import {FlatList, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Cell = ({item}) => {
  return (
    <View
      style={{
        borderBottomWidth: 0.5,
        borderColor: 'grey',
        paddingHorizontal: 16,
        flex: 1,
      }}>
      <Text style={{paddingVertical: 4}}>
        {'NAME: '}
        {item?.name}
      </Text>
      <Text style={{paddingVertical: 4}}>
        {'SYMBOL: '}
        {item?.symbol?.toUpperCase()}
      </Text>
      <Text style={{paddingVertical: 4}}>
        {'UNIT: '}
        {item?.unit}
      </Text>
      <Text style={{paddingVertical: 4}}>
        {'TOTAL PRICE: MYR '}
        {item?.totalPrice}
      </Text>
    </View>
  );
};

const History = ({...props}) => {
  const [items, setItems] = useState();
  props.historyItems.then(value => setItems(value?.historyItems));

  if (!items) {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
        <Text style={{textAlign: 'center'}}>{'No items in history'}</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <FlatList
          data={items}
          renderItem={({item}) => {
            return <Cell item={item} />;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  historyItems: state.historyReducers,
});
export default connect(mapStateToProps)(History);
