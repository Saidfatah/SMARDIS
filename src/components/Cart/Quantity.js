import  React from 'react'
import {View , Text ,StyleSheet} from 'react-native'
import Button from '../Common/Button'

const Quantity=({quantity,guestId,itemId,updateQuantity})=> {
    console.log({guestId})
    return (
        <View style={styles.flex}>
            <Button clickHandler={()=>updateQuantity({guestId,itemId,increment:-1})} >
                <Text>-</Text>
            </Button>
            <Text>{quantity}</Text>
            <Button clickHandler={()=>updateQuantity({guestId,itemId,increment:-1})}  >
                <Text>+</Text>
            </Button>
        </View>
    )
}

export default Quantity

var styles = StyleSheet.create({
    flex:{
        marginBottom:8,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
   }
 });
