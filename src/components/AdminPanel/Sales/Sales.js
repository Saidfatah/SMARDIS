import React from 'react'
import {View,ScrollView,Dimensions,StatusBar} from 'react-native'
import { connect } from 'react-redux'
import SaleItem from './SaleItem'
import Loading from '../../Common/Loading'

const {height}=Dimensions.get('screen')
const HEIGHT = height- StatusBar.currentHeight

const Sales=({todaysSales,done_fetching_todays_Sales,navigation})=> {

    if(todaysSales.length < 1 && !done_fetching_todays_Sales ) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>
  
    return (
        <ScrollView  > 
            <View style={{backgroundColor:'#fff',minHeight:HEIGHT, flex:1 ,padding:8}}>
                    {todaysSales.sort((a,b)=>new Date(b.sale_date) - new Date(a.sale_date)).map((item,i)=> <SaleItem navigation={navigation} sale={item} key={item.id}  />)}
            </View>
        </ScrollView>
    )
}

export default connect(
    state=>({
        todaysSales: state.scheduel.todaysSales ,
        done_fetching_todays_Sales: state.scheduel.done_fetching_todays_Sales ,
    }),
    null
)
(Sales)


