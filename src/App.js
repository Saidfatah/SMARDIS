import React from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar} from 'react-native';
import {Provider} from 'react-redux'
import store from './store/store'
import Cart from './components/Cart/Cart'

const App= () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <Text>Text changed</Text>
        <Cart />
      </SafeAreaView>
    </Provider>
  );
};



export default App;
