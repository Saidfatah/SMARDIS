import React from 'react'
import { connect } from 'react-redux'
import {View,ScrollView} from 'react-native'
import Loading from '../../Common/Loading'
import BackgroundImage from '../../Common/BackgroundImage'
import CanceledItem from './CanceledItem'

const CanceledOrders=({navigation,distrubutor_todays_canceled_orders,distrubutor_todays_canceled_orders_done_fetching})=> {

    return <BackgroundImage >
       {
             distrubutor_todays_canceled_orders.length<1 && !distrubutor_todays_canceled_orders_done_fetching
             ?<View style={{backgroundColor:'transparent',flex: 1,display:'flex',alignItems:'center'}} >
                   <Loading spacing={50} />   
             </View> 
             :  <ScrollView  style={{flex:1}} contentContainerStyle={{height:'100%',padding:8, paddingTop:32}} >
                 {
                     distrubutor_todays_canceled_orders.map((canceledOrder,index) =><CanceledItem 
                     key={canceledOrder.id}
                     navigation={navigation} 
                     canceledOrder={canceledOrder}
                     />)
                 }
            </ScrollView>
       }
    </BackgroundImage> 

}

 export default connect(
    state=>({
        distrubutor_todays_canceled_orders : state.scheduel.distrubutor_todays_canceled_orders,
        distrubutor_todays_canceled_orders_done_fetching : state.scheduel.distrubutor_todays_canceled_orders_done_fetching,
    }),
    null
)(CanceledOrders)

