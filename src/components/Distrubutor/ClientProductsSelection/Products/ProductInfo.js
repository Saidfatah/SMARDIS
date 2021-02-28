import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import {colors} from '../../../Common/Colors'


const ProductInfo=({product,opened,client,isSub})=> {
    const {price1,name,image,discount}=product
 
    let PRICE=price1  
    if(discount <1){
       PRICE=price1 - (price1 *discount)
    }
    if(client){
        const clientPrice = client.price.replace('x','ce')
        PRICE=  product[clientPrice]
        if(discount <1){
            PRICE=product[clientPrice] -(product[clientPrice] *discount)
        }
    }
    
    const Pirce=<View style={{
        flex:1,
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    }} >
            {
                !isSub
                ? <Text style={[styles.productText]}>{PRICE}.00 DH</Text> 
                :null
            }
            {
                discount <1
                ? <Text style={{marginLeft:8,color:colors.GREEN, fontSize:20,fontStyle:"italic",fontWeight:"bold"}}>{"-"+discount*100+"%"}</Text>
                :null
            }
    </View>
    
    let First  = null
    let Second = null
    let Third  = null
    if(!opened){
        First  =   Pirce
        Second =  <Text style={[styles.productText,styles.flexItem]}>{name}</Text> 
        Third  =  <FastImage style={[styles.image]} source={image!='NO_IMAGE'?{uri:image}:require('../../../../images/noImage.jpg')} /> 
    }else{
        Third  =  Pirce
        Second =  <Text style={[styles.productText]}>{name}</Text> 
        First  =  <FastImage style={{...styles.image,height:100, width:100}} source={image!='NO_IMAGE'?{uri:image}:require('../../../../images/noImage.jpg')} /> 
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
    