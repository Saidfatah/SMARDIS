import React from 'react'
import { connect } from 'react-redux'
import {View,Text,TouchableOpacity} from 'react-native'
import Item from '../../Common/Item'

const ValidatedCommands=({navigation,todaysBills,selectBill})=> {
    
    return <View>
        <Text> validatedCommands </Text>
        {
            todaysBills.map((bill,index) => <Item key={index}>
                <TouchableOpacity onPress={e=>{
                    selectBill(bill.id)
                    navigation.navigate('DISTRIBUTOOrderBill')
                }}>
                     <Text> {bill.ref}</Text>
                </TouchableOpacity>
            </Item>)
        }
    </View>
}

 export default connect(
    state=>({
        todaysBills : state.cart.todaysBills
    }),
    dispatch =>({
        selectBill : dispatch.cart.selectBill
    })
)(ValidatedCommands)
