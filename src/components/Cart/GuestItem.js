import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import Item from '../Common/Item'
import Quantity from './Quantity'

const  GuestItem = ({item,guestId,updateQuantity})=> {
    return (
        <Item xStyle={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
            <Quantity  
                 quantity={item.quantity} 
                 updateQuantity={updateQuantity} 
                 itemId={item.id}
                 guestId={guestId}
            />
        </Item>
    )
}

export default GuestItem

var styles = StyleSheet.create({
    item:{
        marginBottom:8,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
   }
 });