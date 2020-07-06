import {createStore, combineReducers, applyMiddleware} from 'redux';
import cartReducers from './Cart/reducers';

const rootReducer = combineReducers({
  cartReducers: cartReducers,
});

const store = createStore(rootReducer);

export default store;
