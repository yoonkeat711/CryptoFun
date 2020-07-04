/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Search from './src/Search';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Cart from './src/Cart';
import History from './src/History';
import Price from './src/Search/Price';

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

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={'Search'} component={SearchStack} />
        <Tab.Screen name={'Cart'} component={Cart} />
        <Tab.Screen name={'History'} component={History} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
