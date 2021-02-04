import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import {View,Text,ScrollView,StyleSheet} from 'react-native'
import Item from '../../Common/Item'
import Button from '../../Common/Button'

const CanceledOrders=({navigation,distrubutor_todays_canceled_orders,fetchDistrubutorTodaysCanceledOrders})=> {
   
    useEffect(() => {
        fetchDistrubutorTodaysCanceledOrders()
    }, [])

    return <ScrollView  style={{flex:1}} contentContainerStyle={{
        height:'100%',
        backgroundColor:'#fff',
        padding:8,
        paddingTop:32
        }} >
        {
            distrubutor_todays_canceled_orders.map((canceledOrder,index) => <Item xStyle={styles.xstyle} key={index}>
            <View style={styles.item}>
                      
                <View style={{display:'flex',flexDirection:'row'}} >
                       <Text style={styles.text}  >
                       { canceledOrder.client.name }
                       </Text> 
                       <Text style={styles.text}  >
                       {"("+canceledOrder.sector.name+")"}
                       </Text> 
                </View>
               
                <Button
                 xStyle={{margin:0,borderRadius:12}} 
                 color={"BLUE"} 
                 clickHandler={e=>{resetOrder(canceledOrder.id) }} 
                 >
                    <Text style={{color:"#fff",textAlign:'center',fontWeight:'bold'}}>Reainstaller</Text>
                </Button>
             </View>
         </Item>)
        }
    </ScrollView>
}

 export default connect(
    state=>({
        distrubutor_todays_canceled_orders : state.scheduel.distrubutor_todays_canceled_orders
    }),
    dispatch =>({
        resetOrder : dispatch.scheduel.resetOrder,
        fetchDistrubutorTodaysCanceledOrders : dispatch.scheduel.fetchDistrubutorTodaysCanceledOrders,
    })
)(CanceledOrders)

const styles = StyleSheet.create({
    item:{  
        display:'flex', 
        flexDirection:'row-reverse' ,  
        justifyContent:'space-between',
        alignItems:'center', 
        paddingLeft:16 ,
    },
    xstyle:{  
        marginBottom:16
    },
    text:{flex:1,fontWeight:'bold',textAlign:'right'}
})