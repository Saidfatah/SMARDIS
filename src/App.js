import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux'
import store from './store/store'
import Navigator from './components/Navigation/Navigator'

const App= () => {
  return <Provider store={store}> 
  <Navigator/> 
  </Provider>

};



export default App;
