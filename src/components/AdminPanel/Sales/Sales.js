import React from 'react'
import {View,ScrollView,Dimensions,StatusBar} from 'react-native'
import { connect } from 'react-redux'
import { List } from 'react-native-paper';
import SaleItem from './SaleItem'
import Loading from '../../Common/Loading'
import Item from '../../Common/Item'

const {height}=Dimensions.get('screen')
const HEIGHT = height- StatusBar.currentHeight

const Sales=({valide_orders,done_fetching_todays_Sales,navigation})=> {
    const TITLE = valide_orders.length >0   
    ? "les ventes d'aujourdhui" 
    :"aucune ventes ajourdhui"

    if(valide_orders.length < 1 && !done_fetching_todays_Sales ) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>
  


 
    return (
        <ScrollView  > 
            <View style={{backgroundColor:'#fff',minHeight:HEIGHT, flex:1 ,padding:8}}>
                    {valide_orders.map((item,i)=> <SaleItem navigation={navigation} sale={item} key={item.id}  />)}
            </View>
        </ScrollView>
    )
}

export default connect(
    state=>({
        valide_orders: state.scheduel.valide_orders ,
        done_fetching_todays_Sales: state.scheduel.done_fetching_todays_Sales ,
    }),
    null
)
(Sales)


