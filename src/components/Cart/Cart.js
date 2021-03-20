import React,{useEffect,useState} from 'react'
import {View,ScrollView,Text} from 'react-native'
import { connect } from 'react-redux'
import CartItem from './CartItem'
import Button from '../Common/Button'
import Badge from '../Common/Badge'
import Item from '../Common/Item'
import {Decimal} from 'decimal.js';


export const Cart=({navigation,cartItems,guest,removeCartItem,done_validating_product,resetIsDone,updateQuantity,validateOrder})=> {
    const [canValidate, setcanValidate] = useState(true)

    useEffect(() => {
        done_validating_product == true && setcanValidate(true) && resetIsDone("done_validating_product")
    }, [done_validating_product])



    if(guest == null || !cartItems.length) 
    return <ScrollView style={{flex:1}} contentContainerStyle={{padding:16}} >
             <Text> Le panier est vide</Text> 
    </ScrollView> 
    
    let TOTAL= new Decimal(cartItems.reduce((a,c)=>a+(c.priceForClient * c.quantity),0)).toFixed(2)
    if(TOTAL == undefined || TOTAL == NaN){
        TOTAL= new Decimal(cartItems.reduce((a,c)=>a+(c.priceForClient * c.quantity),0)).toFixed(2)
    }

    const CartHeader=()=>{
        return <Item xStyle={{marginBottom:16}} >
             <Text>{"Client : "+guest.name}</Text>
             <View style={{ 
                 display:'flex', 
                 flexDirection:'row', 
                 alignItems:"center",
                 }}>
                 <Text>{"Total : "}</Text>
                 <Badge 
                     status={"success"} 
                     value={(TOTAL).toString()+" DH"} 
                     textStyle={{ fontSize:14 }} 
                     containerStyle={{marginLeft:16}} 
                     badgeStyle={{ height:24  }}
                 />
             </View>
        </Item>
    }
    const CartFooter=()=>{
        return <Button 
        color={"BLUE"}  
        disabled={!canValidate} 
        clickHandler={e=>{
            setcanValidate(false)
            validateOrder({navigation})
        }}>
            <Text style={{color:"#fff",textAlign:'center'}}>Valider</Text>
        </Button>
    }
    const CartItemsList=()=>{
        return cartItems.map((item,i)=><CartItem  
        key={i}  
        {...{
            guestId:guest.id,
            updateQuantity,
            removeCartItem,
            item
        }} 
        />)
    }


    return ( 
        <ScrollView style={{flex:1}} contentContainerStyle={{padding:16}} >
            <CartHeader />
             <CartItemsList />
             <CartFooter />
        </ScrollView>
    )
}


export default  connect(
    state    =>({
        cartItems:state.cart.cartItems,
        guest:state.cart.guest,
        done_validating_product:state.cart.done_validating_product,
    }),
    dispatch =>({
        removeCartItem    : dispatch.cart.removeCartItem,
        validateOrder : dispatch.cart.validateOrder,
        updateQuantity     : dispatch.cart.updateQuantity ,
        resetIsDone     : dispatch.cart.resetIsDone ,
    })
)(Cart)
