import React,{useRef} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'



const ProductInfo=({product,opened,client,isSub})=> {
    const {price1,name,image,discount}=product
  
    let PRICE = parseFloat(price1).toFixed(2)
    if(discount > 0  ){
       PRICE = parseFloat(discount).toFixed(2)
    }
    if(client){
        const clientPrice = client.price.replace('x','ce')
        PRICE= parseFloat(product[clientPrice]).toFixed(2)
        if(discount > 0 ){
            parseFloat(discount).toFixed(2)
        }
    }

    
    
    let First  = null
    let Second = null
    let Third  = null
    if(!opened){
        First  =   <Text style={[styles.productText]}>{PRICE} DH</Text>
        Second =  <Text style={[styles.productText,styles.flexItem,{textAlign:'center'}]}>{name}</Text> 
        Third  =  <FastImage style={[styles.image]} source={image!='NO_IMAGE'?{uri:image}:require('../../../../images/noImage.jpg')} /> 
    }else{
        Third  =  <Text style={[styles.productText]}>{PRICE}  DH</Text>
        Second =  <Text style={[styles.productText]}>{name}</Text> 
        First  =  <FastImage style={{...styles.image,height:100, width:100}} source={image!='NO_IMAGE'?{uri:image}:require('../../../../images/noImage.jpg')} /> 
    }


    if(isSub){
        return <View style={{ ...styles.productInfo, flexDirection:opened?'column':'row'}} >
       {Second}     
   </View> 
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
        width:'100%',
        paddingLeft:16,
        paddingRight:16,
        alignItems:'center',
     
    },
    flexItem:{
        flex:1
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
    