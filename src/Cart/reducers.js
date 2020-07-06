import {
  ADD_CART,
  CHECKOUT_CART,
  DISPLAY_CART,
} from './actions';
import AsyncStorage from '@react-native-community/async-storage';
import storageKey from '../constants/storageKey';

const cartStorageItem = (async() => {
  return JSON.parse(await AsyncStorage.getItem(storageKey.cart));
})();

const initialState = {
  cartItems: null,
}

const reducer = async (state = initialState, action) => {
  const cartStorageItem = JSON.parse(
    await AsyncStorage.getItem(storageKey.cart));
  // console.warn(cartStorageItem);
  console.log(action.payload);


  switch (action.type) {
    case DISPLAY_CART:
      return {
        cartItems: action.payload,
      }
    case ADD_CART:
      return {
        cartItems: action.payload,
      }
    case CHECKOUT_CART:
      return {
        cartItems: null,
      }
    default:
      return state;
  }
}

export default reducer;

