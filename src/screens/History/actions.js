export const DISPLAY_HISTORY = 'SHOW_HISTORY';
export const ADD_HISTORY = 'CHECKOUT';

export const displayHistory = (item) => ({
  type: DISPLAY_HISTORY,
  payload: item,
});

export const addHistory = (item) => ({
  type: ADD_HISTORY,
  payload: item,
});

