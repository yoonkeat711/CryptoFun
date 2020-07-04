import React, {Component, useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CryptoCell from './components/CryptoCell';
import MockCoinList from './coinlist.json';
import QUERY_DOMAIN from './QUERY_DOMAIN';

const COIN_LIST_API = `${QUERY_DOMAIN}` + '/coins/list';

const Search = ({navigation}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(null);

  const fetchData = useCallback(() => {
    // fetch(COIN_LIST_API, {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setData(response);
    //   })
    //   .catch((err) => {
    //     console.warn(err);
    //   });
    setData(MockCoinList);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = (() => {
    if (!text?.trim().length) {
      return data;
    }

    return data.filter((item) => {
      return (
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.symbol.toLowerCase().includes(text.toLowerCase())
      );
    });
  })();

  const navigateToPrice = (item) => {
    navigation.navigate('Price', {
      item: item,
    });
  }

  return (
    <View>
      <SafeAreaView>
        <TextInput
          placeholder={'Search currency here or currency symbol here'}
          style={{marginHorizontal: 16, paddingVertical: 8}}
          onChangeText={(value) => setText(value)}
        />
        <FlatList
          data={filteredData}
          initialNumToRender={5}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => navigateToPrice(item)}>
            <CryptoCell
              symbol={item.symbol}
              name={item.name}
              index={index + 1}
            />
            </TouchableOpacity>
          )}
          ListHeaderComponent={() => (
            <CryptoCell symbol={'SYMBOL'} name={'NAME'} index={'#'} />
          )}
          ListHeaderComponentStyle={{
            borderBottomWidth: 0.5,
            borderBottomColor: 'grey',
          }}
          ItemSeparatorComponent={() => {
            return <View style={{height: 0.5, backgroundColor: 'grey'}} />;
          }}
        />
      </SafeAreaView>
    </View>
  );
};


export default Search;
