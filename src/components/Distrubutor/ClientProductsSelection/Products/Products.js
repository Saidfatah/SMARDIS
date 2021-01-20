import React,{useState,useEffect} from 'react'
import {View,StyleSheet,FlatList} from 'react-native'
import ProductItem from './ProductItem'


const Products=({selectedCategoryProducts,setIsPanelActive,setselectedProduct})=> {
    const [productsList, setproductsList] = useState([])
   
    useEffect(() => {
        setproductsList(selectedCategoryProducts.map((ts,i)=>({...ts,index:i})))
    }, [selectedCategoryProducts])

  

    return (
    <View  style={{flex:1}}> 
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
       
    </View>
    )
}

export default Products
var styles = StyleSheet.create({
    list:{
        flex:1
    },
    flatList:{ 
        justifyContent: "center",
        alignItems: "center",
        flex:1
    }
});
    