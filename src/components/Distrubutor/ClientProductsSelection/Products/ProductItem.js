import React from 'react'
import {View,StyleSheet,TouchableOpacity} from 'react-native'
import ProductInfo from './ProductInfo'

const ProductItem=({client,product,setIsPanelActive,setselectedProduct})=> {
    
    return  <View style={{...styles.product}}>
        <TouchableOpacity onPress={e=>{
            setIsPanelActive(true)
            setselectedProduct(product)
            }}>
             <ProductInfo product={product} client={client} opened={false} />
        </TouchableOpacity>
    </View>
}

export default ProductItem


var styles = StyleSheet.create({
    product:{
        width:'100%',
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
    
