import React,{useState,useEffect} from 'react'
import {View,ScrollView} from 'react-native'
import { connect } from 'react-redux'
import OrderItem from './OrderItem'
import { List } from 'react-native-paper';
import Loading from '../../../Common/Loading'


export const ListOfOrdersValidated = ({navigation,selectBill,valide_orders,done_fetching_todays_validated_orders}) => {


    if(valide_orders.length<1 && !done_fetching_todays_validated_orders) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>
    const TITLE = valide_orders.length >0 ? "les command valider" :"pas de command valider"


    return (
        <ScrollView style={{flex:1,backgroundColor:'#fff'}} contentContainerStyle={{padding:8}}  > 
                 <List.Section title={TITLE}>
                    {
                    valide_orders.map((item,index)=>{
                        return <OrderItem 
                        order={item} 
                        validated={true} 
                        navigation={navigation} 
                        selectBill={selectBill}
                        key={index}  
                        />
                    })
                    }
                 </List.Section>
        </ScrollView>
    )
}

 

export default connect(
    state=>({
        valide_orders: state.scheduel.valide_orders ,
        done_fetching_todays_validated_orders: state.scheduel.done_fetching_todays_validated_orders ,
    }),
    state=>({
        selectBill: state.scheduel.selectBill 
    }),
)
(ListOfOrdersValidated)
