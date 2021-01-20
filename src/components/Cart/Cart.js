import React from 'react'
import {View,ScrollView} from 'react-native'
import { connect } from 'react-redux'
import CartGuests from './CartGuests'



export const Cart=({navigation,cartGuests,removeGuestItem,updateQuantity,validateGuestOrder})=> {
   
    return ( 
        <View style={{padding:16}}>
            <ScrollView>
                 <CartGuests {...{cartGuests,removeGuestItem,updateQuantity,validateGuestOrder,validateGuestOrder,navigation}} /> 
            </ScrollView>
        </View>
    )
}


export default  connect(
    state    =>({cartGuests:state.cart.cartGuests}),
    dispatch =>({
        removeGuestItem    : dispatch.cart.removeGuestItem,
        validateGuestOrder : dispatch.cart.validateGuestOrder,
        updateQuantity     : dispatch.cart.updateQuantity 
    })
)(Cart)
