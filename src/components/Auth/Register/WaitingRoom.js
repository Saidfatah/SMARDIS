import React from 'react'
import {View,Text} from 'react-native'
import BackgroundImage from '../../Common/BackgroundImage'

const WaitingRoom=({navigation,route})=> {
    return (
        <BackgroundImage>
            <View style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flex:1
                }} >
                <Text style={{color:'#fff'}} >Attender L'approval du L'admin </Text>
            </View>
        </BackgroundImage>
    )
}

export default WaitingRoom
