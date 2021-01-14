import React from 'react'
import  {View,StyleSheet,TouchableOpacity} from 'react-native'

const Button=({children,xStyle,clickHandler})=> {
    return  <TouchableOpacity style={{...styles.button,...xStyle}} onPress={e=>clickHandler()}>
         {children}  
    </TouchableOpacity>  
}

export default Button

var styles = StyleSheet.create({
    button:{
        borderBottomColor:'#000',
        margin:8,
        borderRadius:25,
        backgroundColor:'#fff',
        padding:8
   }
 });
