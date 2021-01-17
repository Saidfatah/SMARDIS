import React from 'react'
import {View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native'


const ProductItem=({product})=> {
    const {price,name,image}=product
    return (
        <TouchableOpacity>
            <View style={styles.product}>
                <Text style={styles.productText}>{price}.00 DH</Text>
                <Text style={styles.productText}>{name}</Text>
                <Image style={styles.image} source={{uri:image}} />
            </View>
        </TouchableOpacity>
    )
}

export default ProductItem


var styles = StyleSheet.create({
    product:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        borderColor:'#fff',
        borderBottomColor:'#000',
        borderBottomWidth:1,
        paddingTop:8,
        paddingBottom:8
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
    
