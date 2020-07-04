import React, {useState, useEffect, Component, PureComponent} from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import QUERY_DOMAIN from './QUERY_DOMAIN';

// const Price = ({route, navigation}) => {
//
//   const [price, setPrice] = useState(0);
//
//   React.useEffect = (() => {
//     const PRICE_API =
//       `${QUERY_DOMAIN}` +
//       '/simple/price?ids=' +
//       `${route.params?.item?.id}` +
//       '&vs_currencies=myr';
//   //     // fetch(PRICE_API, {
//   //     //   method: 'GET',
//   //     //   headers: {
//   //     //     Accept: 'application/json',
//   //     //     'Content-Type': 'application/json',
//   //     //   },
//   //     // })
//   //     //   .then((response) => response.json())
//   //     //   .then((response) => {
//   //     //     console.warn(response);
//   //     //     setPrice(response);
//   //     //   })
//   //     //   .catch((err) => {
//   //     //     console.warn(err);
//   //     //   });
//     }, []);
//
//   const fetchPrice = React.useCallback(async() => {
//     const response = await fetch(PRICE_API);
//
//   },[]);
//
//   return (
//     <View style={{flex: 1}}>{console.warn(price)}</View>
//   );
// };

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

const cartStorageKey = '@storage:cart';
const historyStorageKey = '@storage:history';

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

  onPressCheckout = async (value) => {
    // await AsyncStorage.setItem(historyStorageKey, value);
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
            <TouchableOpacity style={{}} onPress={() => this.onPressCheckout()}>
              <Text>{'Checkout'}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>{'Add to Cart'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  }
}

export default Price;
