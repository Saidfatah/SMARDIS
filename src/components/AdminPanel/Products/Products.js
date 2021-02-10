import React,{useEffect} from 'react'
import {View,Text,FlatList,StyleSheet,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import ProductInfo from '../../Distrubutor/ClientProductsSelection/Products/ProductInfo'
import Loading from '../../Common/Loading'


const  Products=({products,navigation,fetchMoreProducts,done_fetching_products,fetchProducts})=> {
    useEffect(() => {
        fetchProducts()
    }, [])

    const handleLoadMore=()=>{
        fetchMoreProducts()
    }
     
    if(products.length < 1  && !done_fetching_products) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>


    return <View style={{backgroundColor:'#fff',flex: 1}} > 
         <FlatList 
         data   = {products}
         style  = {{...styles.list}}
         contentContainerStyle = {props =>(styles.flatList)}
         showsVerticalScrollIndicator={false}
         onEndReached={e=>handleLoadMore()}
         onEndReachedThreshold={products.length-2/products.length}
         ListFooterComponent={<View style={{ height: 0, marginBottom: 90 }}></View>}
         renderItem   = {({ item ,index}) =><View style={styles.product}>
              <TouchableOpacity onPress={e=>{ navigation.navigate('ADMINproductPage',{product:item})}}>
                  <ProductInfo   key={index}   product={item} opened={false} />
              </TouchableOpacity>
         </View>
         }
         keyExtractor = {(item, index) => index.toString()}
        />
    </View>
}

export default connect(
    state=>({
         products:state.products.products,
         done_fetching_products:state.products.done_fetching_products,
    }),
    dispatch=>({
         fetchProducts : dispatch.products.fetchProducts,
         fetchMoreProducts : dispatch.products.fetchMoreProducts
    })
)(Products)

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
    },
    list:{
        padding:16,
        flex: 1,
        paddingHorizontal:0
    },
    flatList:{ 
        alignItems: 'center',
         justifyContent: 'center', 
         flex:1
    },
    title:{
       fontSize:20,
       marginTop:16,
       color:'#fff'
    }
  });
  
