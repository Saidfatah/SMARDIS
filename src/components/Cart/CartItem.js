import React from 'react'
import {Text,StyleSheet} from 'react-native'
import Item from '../Common/Item'
import Quantity from './Quantity'
import IconButton from '../Common/Buttons/IconButtons'


const  CartItem = ({item,guestId,removeCartItem,updateQuantity})=> {
    return (
        <Item xStyle={styles.item}>
            <IconButton clickHandler={e=>removeCartItem({itemId:item.id})} />
            <Text>{item.name}</Text>
            <Text>{item.priceForClient}</Text>
            <Quantity  
                 quantity={parseFloat(parseFloat(item.quantity).toFixed(2))} 
                 updateQuantity={updateQuantity} 
                 itemId={item.id}
                 guestId={guestId}
            />
        </Item>
    )
}

export default  CartItem

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