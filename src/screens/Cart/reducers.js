import {
  ADD_CART,
  CHECKOUT_CART,
  DISPLAY_CART,
} from './actions';

const initialState = {
  cartItems: null,
}

const reducer = async (state = initialState, action) => {
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

