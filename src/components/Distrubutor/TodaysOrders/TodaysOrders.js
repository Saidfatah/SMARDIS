import React , {useEffect,useState} from 'react'
import {View,Text,FlatList,StyleSheet , TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import SectorItem from './SectorItem'
import BackgroundImage from '../../Common/BackgroundImage'
import { List } from 'react-native-paper';

const  TodaysOrders=({todaysSectors,navigation})=> {
  const [sectorsToGoTo, setsectorsToGoTo] = useState([])

  let TITLE=todaysSectors.length
  ? "Les mission d'aujourdhui"
  :"Les aucaun de mission active"

  useEffect(() => {
  setsectorsToGoTo(todaysSectors.map((ts,i)=>({...ts,index:i,opened:false})))
  }, [todaysSectors])
  


  return (
    <BackgroundImage  >
        <List.Section 
        style={{padding:8}}
        title={TITLE} 
        titleStyle={{color:'#fff'}}
        >
          {sectorsToGoTo.map((order,index)=><SectorItem 
          key={index}
          orderId={order.id}
          sector={order.distination.sector} 
          navigation={navigation} 
          clients={order.distination.clients}  
          />)}
         </List.Section>
    </BackgroundImage>
    
  )
}


export default connect(
  state=>({
      todaysSectors : state.order.todaysSectors
  }),
  null
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

