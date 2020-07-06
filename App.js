/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Search from './src/screens/Search';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Cart from './src/screens/Cart';
import History from './src/screens/History';
import Price from './src/screens/Search/Price';
import {Provider} from 'react-redux';
import store from './src/store';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"Search"} component={Search} options={{
        headerShown: false
      }} />
      <Stack.Screen name={"Price"} component={Price} />
    </Stack.Navigator>
  )
}

const NavigationsContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={'Search'} component={SearchStack} />
        <Tab.Screen name={'Cart'} component={Cart} />
        <Tab.Screen name={'History'} component={History} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationsContainer />
    </Provider>

  );
};
export default App;
