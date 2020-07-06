import {
  ADD_HISTORY,
  DISPLAY_HISTORY,
} from './actions';

const initialState = {
  historyItems: null,
}

const reducer = async (state = initialState, action) => {
  switch (action.type) {
    case ADD_HISTORY:
      return {
        historyItems: action.payload,
      }
    case DISPLAY_HISTORY:
      return {
        historyItems: action.payload,
      }
    default:
      return state;
  }
}

export default reducer;
