import React from 'react'
import {View,ScrollView} from 'react-native'
import { connect } from 'react-redux'
import CartGuests from './CartGuests'



export const Cart=({cartGuests,updateQuantity,removeGuestItem,validateGuestOrder})=> {
   
    return ( 
        <View style={{padding:16}}>
            <ScrollView>
                 <CartGuests {...{cartGuests,updateQuantity,removeGuestItem,validateGuestOrder,validateGuestOrder}} /> 
            </ScrollView>
        </View>
    )
}


export default  connect(
    state    =>({cartGuests:state.cart.cartGuests}),
    dispatch =>({
        updateQuantity     : dispatch.cart.updateQuantity,
        removeGuestItem    : dispatch.cart.removeGuestItem,
        validateGuestOrder : dispatch.cart.validateGuestOrder
    })
)(Cart)
