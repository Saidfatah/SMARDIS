import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
const ProductInfo=({product,opened})=> {
    const {price,name,image}=product

    
    let First  = null
    let Second = null
    let Third  = null
    if(!opened){
        First  =  <Text style={styles.productText}>{price}.00 DH</Text> 
        Second =  <Text style={styles.productText}>{name}</Text> 
        Third  =  <FastImage style={styles.image} source={{uri:image}} /> 
    }else{
        Third  =  <Text style={styles.productText}>{price}.00 DH</Text> 
        Second =  <Text style={styles.productText}>{name}</Text> 
        First  =  <FastImage style={{...styles.image,height:100, width:100}} source={{uri:image}} /> 
    }

    return <View style={{ ...styles.productInfo, flexDirection:opened?'column':'row'}} >
       {First}     
       {Second}     
       {Third}     
   </View>
    
}

export default ProductInfo
var styles = StyleSheet.create({
    productInfo:{
        display:'flex',
        justifyContent:"space-around",
        alignItems:'center',
        width:'100%'
    },
    image:{
        height:40,
        width:40, 
        borderRadius:50,
    },
    productText:{
        fontSize:20
    },

});
    