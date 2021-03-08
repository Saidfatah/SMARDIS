import React from 'react'
import  {View,StyleSheet,TouchableWithoutFeedback} from 'react-native'
import {colors} from './Colors'
import Loading from './Loading'

const Button=({children,xStyle,clickHandler,color,disabled,loadingSize,noLoading,padding})=> {
    let  COLOR= '#fff'
  
    if(color) COLOR= colors[color]
   
   
    return  <TouchableWithoutFeedback 
         disabled={disabled?true:false}
         
         onPress={e=>clickHandler()}
         >
             <View style={{
             ...styles.button,
             ...xStyle,
             backgroundColor:COLOR,
             padding:padding || 8
              }} >
                {
                !disabled || noLoading
                ?children
                :<Loading  spacing={loadingSize||30} /> 
                }  
             </View>
    </TouchableWithoutFeedback>  
}

export default Button

var styles = StyleSheet.create({
    button:{
        borderRadius:12,
        backgroundColor:'#fff',
        margin:8,
        padding:8
   }
 });
