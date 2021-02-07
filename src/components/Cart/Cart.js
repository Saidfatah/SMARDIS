import React from 'react'
import {View,ScrollView} from 'react-native'
import { connect } from 'react-redux'
import CartGuests from './CartGuests'



export const Cart=({navigation,cartGuests,removeGuestItem,done_validating_product,resetIsDone,updateQuantity,validateGuestOrder})=> {
   
    return ( 
        <View style={{padding:16}}>
            <ScrollView>
                 <CartGuests {...{cartGuests,done_validating_product,resetIsDone,removeGuestItem,updateQuantity,validateGuestOrder,validateGuestOrder,navigation}} /> 
            </ScrollView>
        </View>
    )
}


export default  connect(
    state    =>({
        cartGuests:state.cart.cartGuests,
        done_validating_product:state.cart.done_validating_product,
    }),
    dispatch =>({
        removeGuestItem    : dispatch.cart.removeGuestItem,
        validateGuestOrder : dispatch.cart.validateGuestOrder,
        updateQuantity     : dispatch.cart.updateQuantity ,
        resetIsDone     : dispatch.cart.resetIsDone ,
    })
)(Cart)
