import React, {useState} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import storageKey from '../../constants/storageKey';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import store from '../../store';
import {checkoutCart} from './actions';
import {displayHistory} from '../History/actions';

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
        {item?.symbol.toUpperCase()}
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
const Cart = ({...props}) => {
  const [items, setItems] = useState(null);
  props.cartItems.then((value) => setItems(value?.cartItems));

  const onPressCheckout = async () => {
    const historyItem = JSON.parse(
      await AsyncStorage.getItem(storageKey.history),
    );
    console.warn(items);
    if (historyItem) {
      items.forEach((item) => {
        historyItem.push(item);
      });
      await AsyncStorage.setItem(
        storageKey.history,
        JSON.stringify(historyItem),
      );
      store.dispatch(displayHistory(historyItem));
    } else {
      await AsyncStorage.setItem(storageKey.history, JSON.stringify(items));
      store.dispatch(displayHistory(items));
    }
    await AsyncStorage.removeItem(storageKey.cart);
    store.dispatch(checkoutCart());
  };

  if (!items) {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
        <Text style={{textAlign: 'center'}}>{'No items in cart'}</Text>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: useSafeAreaInsets().top,
        }}>
        <FlatList
          data={items}
          renderItem={({item}) => {
            return <Cell item={item} />;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity
          style={{
            borderTopWidth: 0.5,
            borderColor: 'grey',
            position: 'absolute',
            bottom: 0,
            paddingVertical: 16,
            width: '100%',
            backgroundColor: 'white',
          }}
          onPress={onPressCheckout}>
          <Text style={{textAlign: 'center'}}>{'CHECKOUT'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const mapStateToProps = (state) => ({
  cartItems: state.cartReducers,
});

export default connect(mapStateToProps)(Cart);
