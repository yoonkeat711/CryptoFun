import {createStore, combineReducers, applyMiddleware} from 'redux';
import cartReducers from './screens/Cart/reducers';
import historyReducers from './screens/History/reducers';

const rootReducer = combineReducers({
  cartReducers: cartReducers,
  historyReducers: historyReducers,
});

const store = createStore(rootReducer);

export default store;
