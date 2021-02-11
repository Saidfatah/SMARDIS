import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import Item from '../Common/Item'
import Quantity from './Quantity'
import IconButton from '../Common/Buttons/IconButtons'


const  GuestItem = ({item,guestId,removeGuestItem,updateQuantity})=> {
    return (
        <Item xStyle={styles.item}>
            <IconButton clickHandler={e=>removeGuestItem({guestId,itemId:item.id})} />
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

export default  GuestItem

var styles = StyleSheet.create({
    item:{
        marginBottom:8,
        flex:1,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
   }
 });