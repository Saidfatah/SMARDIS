import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { Provider} from 'react-redux'
import store from './store/store'
import Navigator from './components/Navigation/Navigator'
import {StatusBar,Alert,BackHandler} from 'react-native'
import Toaster from './components/Common/Toaster'
import {useNetInfo} from "@react-native-community/netinfo";



const App= () => {
  const netInfo = useNetInfo();
 
  const {isConnected}=netInfo

  const alert_=()=>{
    Alert.alert("Connexion Erreur!", "assurez-vous que votre appareil est connecté à Internet ", [
      {
        text: "Quiter L'application",
        onPress: () =>  BackHandler.exitApp(),
        style: "cancel"
       }

    ]);
  }

  useEffect(() => {
    if(isConnected===false && isConnected !==null){
      alert_()
    } 
  }, [isConnected])


  return <Provider store={store}> 
         <StatusBar  barStyle='light-content' backgroundColor="#000f27" />
         <Navigator/> 
         <Toaster />
  </Provider>

};


export default App