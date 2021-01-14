import React from 'react'
import {View,Text,FlatList,StyleSheet} from 'react-native'
import GuestItem from './GuestItem'

const  GuesItems = ({items,guestId,updateQuantity})=> {
    
    return (
        <>
            <FlatList 
                  data   = {items}
                  style  = {{...styles.list}}
                  contentContainerStyle = {props =>(styles.flatList)}
                  showsVerticalScrollIndicator={false}
                  renderItem   = {({ item }) =><GuestItem  {...{guestId,updateQuantity,item}}
                  />}
                  keyExtractor = {(item, index) => index.toString()}
            />
        </>
    )
}

export default GuesItems
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
 });