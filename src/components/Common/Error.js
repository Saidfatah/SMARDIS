import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {StyleSheet, View,Text} from 'react-native'
import {colors} from './Colors'

const Error=({trigger,error,mgb,mga,height})=>{
    let style={
        
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:12,
        padding:8,
        backgroundColor:colors.RED
    }

    if(height){
        style.height=height
    }else{
        style.flex=1
    }

    if(trigger )
        return <View style={[
            style,
            {
                marginBottom : mgb || 0 ,
                marginTop    : mga || 0,
            }
             ]}>
            <Text style={{color:'#fff',textAlign:'center',flex:1}}>{error}</Text>
            <Icon name="error" size={25} color="#fff" />
        </View>

    return <View/>
 }

export default Error

 
