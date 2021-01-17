import React from 'react'
import {View,StyleSheet,FlatList} from 'react-native'
import ProductItem from './ProductItem'

const Products=({selectedCategoryProducts})=> {
    console.log("--------------------------------------------")
    console.log(selectedCategoryProducts)
    return (
        <View style={{  width:'100%'}}> 
        <FlatList 
        decelerationRate={'fast'}
         data   = {selectedCategoryProducts}
         style  = {{...styles.list}}
         contentContainerStyle = {props =>(styles.flatList)}
         showsVerticalScrollIndicator={false}
         renderItem   = {({ item }) =><ProductItem product={item} />}
         keyExtractor = {(item, index) => index.toString()}
        />
    </View>
    )
}

export default Products
var styles = StyleSheet.create({
    list:{
        borderColor:'#fff',
        padding:16,
        width:'100%',
    },
    Clientlist:{
        borderColor:'#fff',
        padding:16,
    },
    flatList:{ 
        alignItems: 'center',
         justifyContent: 'center', 
         height:200,
         flex:1
    },
    item:{
        marginBottom:8
    }
    });
    