import React from 'react'
import  {View,StyleSheet,TouchableOpacity} from 'react-native'
import {colors} from './Colors'

const Button=({children,xStyle,clickHandler,color,disabled})=> {
    let  COLOR= '#fff'
  
    if(color)
    {
       COLOR= colors[color]
    }

    return  <TouchableOpacity 
         disabled={disabled?true:false}
         style={{
             ...styles.button,
             ...xStyle,
             backgroundColor:COLOR
         }} 
         onPress={e=>clickHandler()}
         >
         {children}  
    </TouchableOpacity>  
}

export default Button

var styles = StyleSheet.create({
    button:{
        // borderBottomColor:'#000',
        margin:8,
        borderRadius:25,
        backgroundColor:'#fff',
        padding:8
   }
 });
