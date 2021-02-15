import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import {View,Text,ScrollView,StyleSheet} from 'react-native'
import Item from '../../Common/Item'
import Button from '../../Common/Button'
import Loading from '../../Common/Loading'
import BackgroundImage from '../../Common/BackgroundImage'

const CanceledOrders=({navigation,resetOrder,distrubutor_todays_canceled_orders,resetIsDone,done_resetting_order,distrubutor_todays_canceled_orders_done_fetching})=> {
    const [canReset, setcanReset] = useState(true)

    useEffect(() => {
        done_resetting_order == true && setcanReset(true) && resetIsDone("done_resetting_order")
    }, [done_resetting_order])

    
    return <BackgroundImage >
       {
             distrubutor_todays_canceled_orders.length<1 && !distrubutor_todays_canceled_orders_done_fetching
             ?<View style={{backgroundColor:'transparent',flex: 1,display:'flex',alignItems:'center'}} >
                   <Loading spacing={50} />   
             </View> 
             :  <ScrollView  style={{flex:1}} contentContainerStyle={{height:'100%',padding:8, paddingTop:32}} >
                 {
                     distrubutor_todays_canceled_orders.map((canceledOrder,index) => <Item xStyle={styles.xstyle} key={index}>
                     <View style={styles.item}>
                               
                         <View style={{display:'flex',flexDirection:'row',flex:1}} >
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
                          disabled={!canReset}
                          clickHandler={e=>{
                              setcanReset(false)
                              resetOrder(canceledOrder.id) 
                            }} 
                          >
                             <Text style={{color:"#fff",textAlign:'center',fontWeight:'bold'}}>Reainstaller</Text>
                         </Button>
                      </View>
                   </Item>)
                 }
            </ScrollView>
       }
    </BackgroundImage> 

}

 export default connect(
    state=>({
        done_resetting_order : state.scheduel.done_resetting_order,
        distrubutor_todays_canceled_orders : state.scheduel.distrubutor_todays_canceled_orders,
        distrubutor_todays_canceled_orders_done_fetching : state.scheduel.distrubutor_todays_canceled_orders_done_fetching,
    }),
    dispatch =>({
        resetOrder : dispatch.scheduel.resetOrder,
        resetIsDone : dispatch.scheduel.resetIsDone,
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