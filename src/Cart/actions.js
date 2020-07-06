export const ADD_CART = 'ADD_CART';
export const CHECKOUT_CART = 'CHECKOUT_CART';
export const DISPLAY_CART = 'DISPLAY_CART';

export const displayCart = (item) => ({
  type: DISPLAY_CART,
  payload: item,
});

export const addCart = (item) => ({
  type: ADD_CART,
  payload: item,
});

export const checkoutCart = (item) => ({
  type: CHECKOUT_CART,
  payload: item,
});
