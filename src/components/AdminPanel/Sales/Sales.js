import React from 'react'
import {View,FlatList,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import SaleItem from './SaleItem'
import Loading from '../../Common/Loading'


const Sales=({todaysSales,done_fetching_todays_Sales,navigation})=> {

    if(todaysSales.length < 1 && !done_fetching_todays_Sales ) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>
  
    const renderItem =({ item }) =><SaleItem  
    {...{
        sale:item,
        navigation
    }}
    />


    return (
        <View style={{backgroundColor:'#fff',flex: 1}} >
            <FlatList 
               data   = {todaysSales.sort((a,b)=>new Date(b.sale_date) - new Date(a.sale_date))}
               style  = {{...styles.list}}
               contentContainerStyle = {props =>(styles.flatList)}
               showsVerticalScrollIndicator={false}
               ListFooterComponent={<View style={{ height: 0, marginBottom: 90 }}></View>}
               renderItem   = {renderItem}
               keyExtractor = {(item, index) => index.toString()}
             />
       </View>
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


var styles = StyleSheet.create({
    Clientlist:{
        borderColor:'#fff',
        padding:16,
    },
    list:{
      padding:16,
      flex: 1
  },
  flatList:{ 
      alignItems: 'center',
       justifyContent: 'center', 
       flex:1
  },
    title:{
       fontSize:20,
       marginTop:16,
       color:'#fff'
    }
  });


