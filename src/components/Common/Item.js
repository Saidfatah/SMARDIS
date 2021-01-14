import React from 'react'
import  {View,StyleSheet} from 'react-native'

const Item=({children,xStyle})=> {
    return  <View style={{...styles.item,...xStyle}}>
         {children}  
         </View>  
}

export default Item

var styles = StyleSheet.create({
    item:{
        borderColor:'#fff',
        elevation:5,
        borderRadius:25,
        backgroundColor:'#fff',
        padding:8
   }
 });
