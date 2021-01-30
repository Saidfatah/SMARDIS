import React from 'react'
import {View,Text,FlatList,StyleSheet,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import ProductInfo from '../../Distrubutor/ClientProductsSelection/Products/ProductInfo'

const  Products=({products,navigation,fetchProducts})=> {
    
    return <View style={{backgroundColor:'#fff'}} > 
        
         <FlatList 
         data   = {products}
         style  = {{...styles.list}}
         contentContainerStyle = {props =>(styles.flatList)}
         showsVerticalScrollIndicator={false}
         onEndReached={e=> {
           console.log('reached end')
          //  setTimeout(()=>fetchMore(),2000)
          }}
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
         products:state.products.products
    }),
    dispatch=>({
         fetchProducts : dispatch.products.fetchProducts
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
        borderColor:'#fff',
        padding:16,
    },
    Clientlist:{
        borderColor:'#fff',
        padding:16,
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
  
