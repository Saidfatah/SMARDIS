import React from 'react'
import {View,Text,FlatList,StyleSheet} from 'react-native'
import GuesItems from './GuesItems'
import Item from '../Common/Item'

const CartGuests=({cartGuests,updateQuantity})=> {
   
    const RenderItem=({guest})=>{
        const {items,name}=guest

        return <Item xStyle={styles.item}>
             <Text>name</Text>
             <GuesItems items={items} guestId={guest.id} updateQuantity={updateQuantity} />
        </Item>
    }

    return (
        <FlatList 
         data   = {cartGuests}
         style  = {{...styles.list}}
         contentContainerStyle = {props =>(styles.flatList)}
         showsVerticalScrollIndicator={false}
         renderItem   = {({ item }) =><RenderItem guest={item} updateQuantity={updateQuantity} />}
         keyExtractor = {(item, index) => index.toString()}
        />
    )
}

export default CartGuests

var styles = StyleSheet.create({
    list:{
        borderColor:'#fff',
        padding:16,
    },
    flatList:{ 
        alignItems: 'center',
         justifyContent: 'center', 
         height:200,
         flex:1
    },
    item:{
        marginBottom:8
    }
 });
