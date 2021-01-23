import React from 'react'
import {View,Text,ScrollView,Dimensions,StatusBar} from 'react-native'
import { connect } from 'react-redux'
import ScheduleItem from './ScheduleItem'
import { List } from 'react-native-paper';

const {height}=Dimensions.get('screen')
const HEIGHT = height- StatusBar.currentHeight


export const ListOfSchedules = ({orders}) => {
    const TITLE = orders.length >0 ? "les order active" :"ilnya pas de emploi du temps"

    return (
        <ScrollView  > 
            <View style={{backgroundColor:'#fff',minHeight:HEIGHT, flex:1 ,padding:8}}>
                 <List.Section title={TITLE}>
                    {orders.map((item,i)=> <ScheduleItem schedule={item} key={i}  />)}
                 </List.Section>
            </View>
        </ScrollView>
    )
}

 

export default connect(
    state=>({
        orders: state.order.orders 
    }),
    null
)
(ListOfSchedules)
