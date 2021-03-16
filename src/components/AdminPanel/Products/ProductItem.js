import React,{memo,useMemo,useRef} from 'react'
import {View,TouchableOpacity,StyleSheet,Text} from 'react-native'
import ProductInfo from '../../Distrubutor/ClientProductsSelection/Products/ProductInfo'


const ProductItem=({item,navigation})=>{
 
  const navigateToProductPage=e=>{ 
    navigation.navigate('ADMINproductPage',{product:item})
  }

  return <View style={styles.product}>
  <TouchableOpacity onPress={navigateToProductPage}>
      <ProductInfo   product={item} opened={false} />  
  </TouchableOpacity>
</View>
}

const isEqual=(prevProps,nextProps)=>{
  const prevItem =prevProps.item 
  const nextItem =nextProps.item 
  
 
 
  if(prevItem["subCategory"] != nextItem["subCategory"]){
    return false
  } 
  if(prevItem["image"] != nextItem["image"]){
    return false
  } 
  if(prevItem["price1"] != nextItem["price1"]){
    return false
  } 
  if(prevItem["name"] != nextItem["name"]){
    return false
  } 

  if(prevItem["regions"].length != nextItem["regions"].length){
       return false
  }else{
       const length =prevItem["regions"].length
       for (let i = 0; i < length; i++) {
         if(prevItem["regions"][i] != nextItem["regions"][i]) return false
       }
  }

  if(prevItem["category"].length != nextItem["category"].length){
       return false
  }else{
       const length =prevItem["category"].length
       for (let i = 0; i < length; i++) {
         if(prevItem["category"][i] != nextItem["category"][i]) return false
       }
  }

  if(prevItem["discount"] != nextItem["discount"]){
    return false
  } 
  if(prevItem["price2"] != nextItem["price2"]){
    return false
  } 
  if(prevItem["price3"] != nextItem["price3"]){
    return false
  } 
  if(prevItem["price4"] != nextItem["price4"]){
    return false
  } 
  return true

}
 
export default memo(ProductItem,isEqual)

var styles = StyleSheet.create({
  product:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      width:'100%',
      borderColor:'#fff',
      borderBottomColor:'#000',
      borderBottomWidth:1,
      paddingTop:8,
      paddingBottom:8,
      flex: 1,
  }
});


