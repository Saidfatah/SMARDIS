import React from 'react'
import {View,StyleSheet,TouchableOpacity} from 'react-native'
import ProductInfo from './ProductInfo'

const ProductItem=({product,setIsPanelActive,setselectedProduct})=> {
    
    return  <View style={{...styles.product}}>
        <TouchableOpacity onPress={e=>{
            setIsPanelActive(true)
            setselectedProduct(product)
            }}>
             <ProductInfo product={product} setIsPanelActive={setIsPanelActive} opened={false} />
        </TouchableOpacity>
    </View>
}

export default ProductItem


var styles = StyleSheet.create({
    product:{
        marginBottom:16,
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
    
