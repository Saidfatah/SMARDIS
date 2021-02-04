import React from 'react'
import {StyleSheet} from 'react-native'
import GuesItems from './GuesItems'
import Item from '../Common/Item'
import { List } from 'react-native-paper';


const CartGuests=({navigation,cartGuests,updateQuantity,validateGuestOrder,removeGuestItem})=> {
    const TITLE = cartGuests.length >0 ? "les paneirs active" :"Le panier est vide"
    const RenderItem=({guest})=>{
        const {items,name,sector,status}=guest
 
        if(status == "VALIDATED") return null 
        
        return <Item xStyle={styles.item}>
             <GuesItems 
                 items={items} 
                 name={name} 
                 validateGuestOrder={validateGuestOrder} 
                 sector={sector}
                 navigation={navigation}
                 removeGuestItem={removeGuestItem} 
                 updateQuantity={updateQuantity} 
                 guestId={guest.guestId} 
             />
        </Item>
    }

    return (
        <List.Section title={TITLE}>
           {cartGuests.map((item,i)=> <RenderItem key={i} guest={item}  />)}
         </List.Section>
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
