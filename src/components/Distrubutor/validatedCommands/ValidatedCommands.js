import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import {View,Text,ScrollView,StyleSheet} from 'react-native'
import Item from '../../Common/Item'
import Button from '../../Common/Button'
import Loading from '../../Common/Loading'
import BackgroundImage from '../../Common/BackgroundImage'

const ValidatedCommands=({navigation,todaysBills,fetchDistrubutorTodaysValideOrders,selectBill})=> {
   
    useEffect(() => {
        fetchDistrubutorTodaysValideOrders()
    }, [])

    return <BackgroundImage>
        {
            todaysBills.length<1 
            ?<View style={{backgroundColor:'transparent',flex: 1,display:'flex',alignItems:'center'}} >
            <Loading spacing={50} />   
            </View> 
            :<ScrollView  style={{flex:1}} contentContainerStyle={{ flex:1, padding:8,paddingTop:32}} >
                {
                    todaysBills.map((bill,index) => <Item xStyle={styles.xstyle} key={index}>
                    <View style={styles.item}>
                              
                        <Text style={styles.text}  >
                        {bill.billRef}
                        </Text> 
                       
                        <Button
                         xStyle={{margin:0,borderRadius:12}} 
                         color={"BLUE"} 
                         clickHandler={e=>{
                            selectBill({id:bill.id,distrubutor:true})
                            navigation.navigate('DISTRIBUTOOrderBill')
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
        todaysBills : state.scheduel.distrubutor_todays_valide_orders
    }),
    dispatch =>({
        selectBill : dispatch.scheduel.selectBill,
        fetchDistrubutorTodaysValideOrders : dispatch.scheduel.fetchDistrubutorTodaysValideOrders,
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