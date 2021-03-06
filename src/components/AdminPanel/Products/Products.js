import React,{useMemo,memo} from 'react'
import {View,Text,FlatList,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Loading from '../../Common/Loading'
import ProductItem from './ProductItem'
 
const  Products=memo(({products,navigation,done_fetching_products})=> {

     
    if(products.length < 1  && !done_fetching_products) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>


    
    const renderItem=({ item ,index})=>{
        return <ProductItem  item={item}  navigation={navigation}   />
    }
    const keyExtractor = (item, index) => index.toString() 
    const FoterItem=()=>{
        return <View style={{ height: 0, marginBottom: 90 }}></View>
    }
    const ListEmptyComponent=()=><Text style={{padding:8}} >aucune produit trouve</Text>
   
    console.log("-------Products-------")
   
    return  <View style={{backgroundColor:'#fff',flex: 1}} > 
        <FlatList 
        data   = {products}
        ListEmptyComponent={ListEmptyComponent}
        style  = {{...styles.list}}
        contentContainerStyle = {props =>(styles.flatList)}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={FoterItem}
        renderItem   = {renderItem}
        keyExtractor = {keyExtractor}
        initialNumToRender={12}
       />
    </View> 
   
})

export default connect(
    state=>({
         products:state.products.products,
         done_fetching_products:state.products.done_fetching_products,
    }),
    null
)(Products)

var styles = StyleSheet.create({
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
 
  });
  
