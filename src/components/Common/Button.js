import React from 'react'
import  {View,StyleSheet,TouchableOpacity} from 'react-native'
import {colors} from './Colors'
import Loading from './Loading'

const Button=({children,xStyle,clickHandler,color,disabled,loadingSize,noLoading})=> {
    let  COLOR= '#fff'
  
    if(color) COLOR= colors[color]
   
   
    return  <TouchableOpacity 
         disabled={disabled?true:false}
         style={{
             ...styles.button,
             ...xStyle,
             backgroundColor:COLOR
         }} 
         onPress={e=>clickHandler()}
         >
         {
         !disabled || noLoading
         ?children
         :<Loading  spacing={loadingSize||30} /> 
        }  
    </TouchableOpacity>  
}

export default Button

var styles = StyleSheet.create({
    button:{
        // borderBottomColor:'#000',
        margin:8,
        borderRadius:12,
        backgroundColor:'#fff',
        padding:8
   }
 });
