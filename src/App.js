import 'react-native-gesture-handler';
import React from 'react';
import { Provider} from 'react-redux'
import store from './store/store'
import Navigator from './components/Navigation/Navigator'
import {StatusBar} from 'react-native'
import Toaster from './components/Common/Toaster'

const App= () => {

  return <Provider store={store}> 
         <StatusBar  barStyle='light-content' backgroundColor="#000f27" />
         <Navigator/> 
         <Toaster />
  </Provider>

};


export default App