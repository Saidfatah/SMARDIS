import React,{useCallback} from 'react'
import {View,Text} from 'react-native'
import BackgroundImage from '../../Common/BackgroundImage'
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler ,Alert} from 'react-native';
import Logo from '../../Common/Logo'

const WaitingRoom=({navigation,route})=> {
    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            Alert.alert("Attention!", "Êtes-vous sûr de vouloir quitter?", [
              {
                text: "Annuler",
                onPress: () => null,
                style: "cancel"
              },
              { text: "OUI", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
          };
        
          BackHandler.addEventListener("hardwareBackPress", onBackPress);
        
          return () =>
            BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        
    }, []));

    return (
        <BackgroundImage>
            <View style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flex:1
                }} >
                <Logo width={120} height={120} />
                <Text style={{color:'#fff'}} >Attender L'approval du L'admin </Text>
            </View>
        </BackgroundImage>
    )
}

export default WaitingRoom
