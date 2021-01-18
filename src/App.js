import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux'
import store from './store/store'
import Navigator from './components/Navigation/Navigator'
import {StatusBar,ImageBackground} from 'react-native'
const App= () => {
  return <Provider store={store}> 
         <StatusBar  barStyle='light-content' backgroundColor="#000f27" />
         <Navigator/> 
  </Provider>

};



export default App;
