import React from 'react'
import {View,ScrollView,Dimensions,StatusBar} from 'react-native'
import { connect } from 'react-redux'
import { List } from 'react-native-paper';
import SaleItem from './SaleItem'

const {height}=Dimensions.get('screen')
const HEIGHT = height- StatusBar.currentHeight

const Sales=({todaysSales})=> {
    const TITLE = todaysSales.length >0 
    ? "les ventes d'aujourdhui" 
    :"aucune ventes ajourdhui"

    return (
        <ScrollView  > 
            <View style={{backgroundColor:'#fff',minHeight:HEIGHT, flex:1 ,padding:8}}>
                 <List.Section title={TITLE}>
                    {todaysSales.map((item,i)=> <SaleItem sale={item} key={i}  />)}
                 </List.Section>
            </View>
        </ScrollView>
    )
}

export default connect(
    state=>({
        todaysSales: state.sales.todaysSales 
    }),
    null
)
(Sales)
