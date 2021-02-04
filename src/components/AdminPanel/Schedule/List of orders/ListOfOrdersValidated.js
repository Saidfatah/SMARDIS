import React,{useState,useEffect} from 'react'
import {View,ScrollView} from 'react-native'
import { connect } from 'react-redux'
import OrderItem from './OrderItem'
import { List } from 'react-native-paper';
import Loading from '../../../Common/Loading'


export const ListOfOrdersValidated = ({navigation,selectBill,orders}) => {
    const [validatedOrders, setvalidatedOrders] = useState([])
    const [finishedLoading, setfinishedLoading] = useState(false)
    useEffect(() => {
        let mounted =true
        setTimeout(() => {
            if(mounted)
            setfinishedLoading(true)
        }, 10000);
        return ()=>mounted=false
    }, [])


    if(validatedOrders.length<1 && !finishedLoading) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>
    const TITLE = validatedOrders.length >0 ? "les command valider" :"pas de command valider"


    return (
        <ScrollView style={{flex:1}} > 
            <View style={{backgroundColor:'#fff',flex:1}}>
                 <List.Section title={TITLE}>
                    {validatedOrders.map((item,i)=> <OrderItem 
                    order={item} 
                    validated={true} 
                    navigation={navigation} 
                    selectBill={selectBill}
                    key={i}  
                    />)}
                 </List.Section>
            </View>
        </ScrollView>
    )
}

 

export default connect(
    state=>({
        orders: state.scheduel.orders 
    }),
    state=>({
        selectBill: state.scheduel.selectBill 
    }),
)
(ListOfOrdersValidated)
