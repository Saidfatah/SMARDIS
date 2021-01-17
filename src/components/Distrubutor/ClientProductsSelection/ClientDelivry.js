import React from 'react'
import {View,Text} from 'react-native'
import CategoriesSlider from './CategoriesSlider'
import {connect} from 'react-redux'
import Products from './Products'

const ClientDelivry=({ route, navigation  ,categories,products,selectedCategory,selectCategory,selectedCategoryProducts})=> {
    const { clientId ,client  } = route.params;
    const {name}=client
    return <View style={{  width:'100%'}}>
        <View style={{display:'flex',alignItems:'center',marginTop:16}}>
             <View style={{
                      padding:8,
                      backgroundColor:'#5e5e5e',
                      borderRadius:25,
                      width:200
                 }}>
                 <Text style={{textAlign:'center',color:'#fff'}}>{name}</Text>
             </View>
        </View>
        <CategoriesSlider {...{navigation,categories,selectedCategory,selectCategory}} />
        <Products selectedCategoryProducts={selectedCategoryProducts} />
    </View> 

}

export default connect(
    state=>({
        categories       : state.products.categories,
        selectedCategory :  state.products.selectedCategory,
        selectedCategoryProducts :  state.products.selectedCategoryProducts,
    }),
    dispatch=>({
        selectCategory : dispatch.products.selectCategory
    })
  )(ClientDelivry)