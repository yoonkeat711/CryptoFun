import React, {useState, useEffect, Component, PureComponent} from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import QUERY_DOMAIN from '../Search/QUERY_DOMAIN';
import AsyncStorage from '@react-native-community/async-storage';
import storageKey from '../../constants/storageKey';
import store from '../../store';
import {addCart} from '../Cart/actions';
import {addHistory} from '../History/actions';

class LabelValue extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {label, value} = this.props;

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}>
        <Text style={{fontWeight: '700'}}>{label}</Text>
        <Text>{value}</Text>
      </View>
    );
  }
}

class Price extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0,
      totalPrice: 0,
      unit: 1,
      isLoading: true,
    };
  }

  async componentDidMount(): void {
    const PRICE_API =
      `${QUERY_DOMAIN}` +
      '/simple/price?ids=' +
      `${this.props.route.params?.item?.id}` +
      '&vs_currencies=myr';

    fetch(PRICE_API)
      .then((response) => response.json())
      .then((response) => {
        const price = response[this.props.route.params?.item?.id];
        this.setState({
          price: price['myr'],
          isLoading: false,
        });
      });
  }

  onAmountChange = (value) => {
    this.setState({
      unit: value,
      totalPrice: value * this.state.price,
    });
  };

  onPressCheckout = async () => {
    const checkoutItem = {
      ...this.props.route.params?.item,
      totalPrice: this.state.totalPrice.toFixed(2),
      unit: this.state.unit,
    };
    const historyItem = JSON.parse(
      await AsyncStorage.getItem(storageKey.history),
    );

    if (historyItem) {
      historyItem.push(checkoutItem);
      await AsyncStorage.setItem(storageKey.history, JSON.stringify(historyItem));
      store.dispatch(addHistory(historyItem));
    } else {
      await AsyncStorage.setItem(storageKey.history, JSON.stringify([checkoutItem]));
      store.dispatch(addHistory([checkoutItem]));
    }

    Alert.alert('Checkout', 'Checked out!');
    this.props.navigation.goBack();
  };

  onPressCart = async () => {
    const cartItem = {
      ...this.props.route.params?.item,
      totalPrice: this.state.totalPrice.toFixed(2),
      unit: this.state.unit,
    };

    const cartStorageItem = JSON.parse(
      await AsyncStorage.getItem(storageKey.cart),
    );

    if (cartStorageItem) {
      cartStorageItem.push(cartItem);
      await AsyncStorage.setItem(
        storageKey.cart,
        JSON.stringify(cartStorageItem),
      );
      store.dispatch(addCart(cartStorageItem));
    } else {
      await AsyncStorage.setItem(storageKey.cart, JSON.stringify([cartItem]));
      store.dispatch(addCart([cartItem]));
    }

    Alert.alert('Cart', 'Added to cart!');
    this.props.navigation.goBack();
  };

  render() {
    const {id, name, symbol} = this.props.route.params?.item;

    if (this.state.isLoading) {
      return <ActivityIndicator style={{flex: 1, alignSelf: 'center'}} />;
    } else
      return (
        <View style={{backgroundColor: 'white', flex: 1}}>
          <LabelValue label={'NAME'} value={name} />
          <LabelValue label={'SYMBOL'} value={symbol.toUpperCase()} />
          <LabelValue label={'CURRENCY'} value={'MYR'} />
          <LabelValue label={'VALUE'} value={this.state.price} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
            <Text style={{fontWeight: '700'}}>{'UNIT'}</Text>
            <TextInput
              style={{
                borderWidth: 1,
                width: 100,
                height: 35,
                textAlign: 'right',
              }}
              value={this.state.unit}
              onChangeText={(value) => this.onAmountChange(value)}
              keyboardType={'numeric'}
            />
          </View>
          <View
            style={{height: 1, backgroundColor: 'grey', marginHorizontal: 16}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 8,
              paddingHorizontal: 16,
            }}>
            <Text style={{fontWeight: '700'}}>{'TOTAL'}</Text>
            <Text>{this.state.totalPrice.toFixed(2)}</Text>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 36,
              paddingVertical: 16,
              position: 'absolute',
              bottom: 0,
              flex: 1,
              borderTopWidth: 0.5,
            }}>
            <TouchableOpacity onPress={() => this.onPressCheckout()}>
              <Text>{'Checkout'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressCart()}>
              <Text>{'Add to Cart'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  }
}

export default Price;
