import React from 'react'
import {View,Text} from 'react-native'
import CategoriesSlider from './CategoriesSlider'
import {connect} from 'react-redux'


const ClientDelivry=({ route, navigation  ,categories,products,selectedCategory,selectCategory})=> {
    const { clientId ,client  } = route.params;

    return <View>
        <Text>client panel</Text>
        <CategoriesSlider {...{navigation,categories,selectedCategory,selectCategory}} />
    </View> 

}

export default connect(
    state=>({
        products         : state.products.products,
        categories       : state.products.categories,
        selectedCategory :  state.products.selectedCategory,
    }),
    dispatch=>({
        selectCategory : dispatch.products.selectCategory
    })
  )(ClientDelivry)