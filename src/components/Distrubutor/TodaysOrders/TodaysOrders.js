import React , {useEffect,useState} from 'react'
import {View,Text,FlatList,StyleSheet ,ScrollView, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import SectorItem from './SectorItem'
import BackgroundImage from '../../Common/BackgroundImage'
import Loading from '../../Common/Loading'
import { List } from 'react-native-paper';

const  TodaysOrders=({todaysSectors,navigation})=> {
  let TITLE=todaysSectors.length ? " Les mission d'aujourdhui" : " Les aucaun de mission active"

 


  return (
    <BackgroundImage  >
      <ScrollView style={{flex:1}} >
        {
          todaysSectors.length <1
          ?
             <View style={{backgroundColor:'transparent',flex: 1,display:'flex',alignItems:'center'}} >
               <Loading spacing={50} />   
            </View> 
          :
            <List.Section 
               style={{padding:8}}
               title={TITLE} 
               titleStyle={{color:'#fff'}}
               >
                 {todaysSectors.map((sector,index)=><SectorItem 
                 key={index}
                 orderId={sector.orderId}
                 sector={sector.sector} 
                 scheduleId={sector.scheduleId} 
                 navigation={navigation} 
                 clients={sector.orders.map(order=>({orderId:order.orderId,currentSectorIndex:index,turn:order.turn,...order.client,done:false}))}  
                 />)}
            </List.Section>
      }
      </ScrollView>
    </BackgroundImage>
    
  )
}


export default connect(
  state=>({
      todaysSectors : state.scheduel.todaysSectors
  }),
  dispatch =>({
    fetchTodaysSectors:dispatch.scheduel.fetchTodaysSectors
  })
)(TodaysOrders)


var styles = StyleSheet.create({
  list:{
      borderColor:'#fff',
      padding:16,
  },
  Clientlist:{
      borderColor:'#fff',
      padding:16,
  },
  flatList:{ 
      alignItems: 'center',
       justifyContent: 'center', 
       height:200,
       flex:1
  },
  title:{
     fontSize:20,
     marginTop:16,
     color:'#fff'
  }
});

