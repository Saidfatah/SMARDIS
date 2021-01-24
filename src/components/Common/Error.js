import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {StyleSheet, View,Text} from 'react-native'
import {colors} from './Colors'


const Error=({trigger,error,mgb,mga})=>{

    if(trigger )
        return <View style={[
            styles.err,
            {
                marginBottom : mgb || 0 ,
                marginTop    : mga || 0
            }
             ]}>
            <Text style={{color:'#fff',textAlign:'center'}}>{error}</Text>
            <Icon name="error" size={25} color="#fff" />
        </View>

    return <View/>
 }

export default Error

var styles = StyleSheet.create({
    err:{
       width:'100%',
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'space-between',
       borderRadius:12,
       padding:8,
       backgroundColor:colors.RED
    }
 
 });
