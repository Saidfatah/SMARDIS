import React,{useState,useEffect} from 'react'
import {View,StyleSheet,FlatList} from 'react-native'
import ProductItem from './ProductItem'
import  SwipeAbleProductDetails from './SwipeAbleProductDetails'


const Products=({selectedCategoryProducts,addCartItem,guest})=> {
    const [productsList, setproductsList] = useState([])
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [selectedProduct, setselectedProduct] = useState(selectedCategoryProducts[0]);
    useEffect(() => {
        setproductsList(selectedCategoryProducts.map((ts,i)=>({...ts,index:i})))
    }, [selectedCategoryProducts])

  

    return (
    <View > 
        <FlatList 
         decelerationRate={'fast'}
         data   = {productsList}
         style  = {styles.list}
         contentContainerStyle = {props =>(styles.flatList)}
         showsVerticalScrollIndicator={false}
         renderItem   = {({ item }) =><ProductItem
             product={item}  
             setIsPanelActive={setIsPanelActive} 
             setselectedProduct={setselectedProduct} 
          />}
         keyExtractor = {(item, index) => index.toString()}
        />
        <SwipeAbleProductDetails {...{selectedProduct,isPanelActive,setIsPanelActive,guest,addCartItem}}  />
    </View>
    )
}

export default Products
var styles = StyleSheet.create({
    list:{
        
    },
    flatList:{ 
        justifyContent: "center",
        alignItems: "center",
        flex:1
    }
});
    