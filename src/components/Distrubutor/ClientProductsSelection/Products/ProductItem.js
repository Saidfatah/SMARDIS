import React from 'react'
import {View,StyleSheet,TouchableOpacity} from 'react-native'
import ProductInfo from './ProductInfo'

const ProductItem=({index,client,product,setIsPanelActive,setselectedProduct,isSub})=> {
    
    console.log({isSub})
    return  <View style={{
        ...styles.product,
        borderTopColor:'#000',
        borderTopWidth:index==0?1:0,
        }}>
        <TouchableOpacity onPress={e=>{
            setIsPanelActive(true)
            setselectedProduct(product)
            }}>
             <ProductInfo product={product} client={client} isSub={isSub} opened={false} />
        </TouchableOpacity>
    </View>
}

export default ProductItem


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
    
