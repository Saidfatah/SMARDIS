import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import {View,Text,ScrollView,StyleSheet} from 'react-native'
import Item from '../../Common/Item'
import Button from '../../Common/Button'
import Loading from '../../Common/Loading'
import BackgroundImage from '../../Common/BackgroundImage'

const ValidatedCommands=({navigation,valide_orders,done_fetching_todays_validated_orders,fetchTodaysValideOrders,selectBill})=> {
   
    useEffect(() => {
        fetchTodaysValideOrders("DISTRUBUTOR")
    }, [])

    return <BackgroundImage>
        {
            valide_orders.length<1  && !done_fetching_todays_validated_orders
            ?<View style={{backgroundColor:'transparent',flex: 1,display:'flex',alignItems:'center'}} >
            <Loading spacing={50} />   
            </View> 
            :<ScrollView  style={{flex:1}} contentContainerStyle={{ flex:1, padding:8,paddingTop:32}} >
                {
                    valide_orders.map((bill,index) => <Item xStyle={styles.xstyle} key={index}>
                    <View style={styles.item}>
                              
                        <Text style={styles.text}  >
                        {bill.billRef}
                        </Text> 
                       
                        <Button
                         xStyle={{margin:0,borderRadius:12}} 
                         color={"BLUE"} 
                         clickHandler={e=>{
                            selectBill({id:bill.id,distrubutor:true})
                            navigation.navigate('BillTable')
                        }} 
                         >
                            <Text style={{color:"#fff",textAlign:'center',fontWeight:'bold'}}>Afficher</Text>
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
        valide_orders : state.scheduel.valide_orders,
        done_fetching_todays_validated_orders : state.scheduel.done_fetching_todays_validated_orders,
    }),
    dispatch =>({
        selectBill : dispatch.scheduel.selectBill,
        fetchTodaysValideOrders : dispatch.scheduel.fetchTodaysValideOrders,
    })
)(ValidatedCommands)

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