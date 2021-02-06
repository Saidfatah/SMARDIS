import React from 'react'
import {View,ScrollView,Dimensions,StatusBar} from 'react-native'
import { connect } from 'react-redux'
import { List } from 'react-native-paper';
import SaleItem from './SaleItem'
import Loading from '../../Common/Loading'

const {height}=Dimensions.get('screen')
const HEIGHT = height- StatusBar.currentHeight

const Sales=({todaysSales})=> {
    const TITLE = todaysSales.length >0 
    ? "les ventes d'aujourdhui" 
    :"aucune ventes ajourdhui"

    if(todaysSales.length < 1 ) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>
  


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
        todaysSales: state.scheduel.todaysSales 
    }),
    null
)
(Sales)


