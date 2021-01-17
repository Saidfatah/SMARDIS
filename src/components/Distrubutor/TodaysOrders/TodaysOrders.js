import React , {useEffect,useState} from 'react'
import {View,Text,FlatList,StyleSheet , TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import SectorItem from './SectorItem'


const  TodaysOrders=({fetchTodaysSectors,todaysSectors,navigation})=> {
  const [sectorsToGoTo, setsectorsToGoTo] = useState([])
 
  useEffect(() => {
  setsectorsToGoTo(todaysSectors.map((ts,i)=>({...ts,index:i,opened:false})))
  }, [todaysSectors])
  
  useEffect(() => {
   fetchTodaysSectors()
  }, [])

  const toggleSector = (id)=>{
    //close the previusly opend sector 
    //then open the clicked one 
    //if the previosly clicked is this same one then close it 
    const sectorsToGoToTemp = [...sectorsToGoTo.map(stt=>({...stt,opened:false})) ]
    if(sectorsToGoTo[id].opened == true) 
    {
      sectorsToGoToTemp[id].opened =  false 
    }else{
      sectorsToGoToTemp[id].opened =  true 

    }
    setsectorsToGoTo(sectorsToGoToTemp)
  }
   
  

  return (
    <View>
        <Text> Les mission d'ajourdhui</Text>
        <FlatList 
         data   = {sectorsToGoTo}
         style  = {{...styles.list}}
         contentContainerStyle = {props =>(styles.flatList)}
         showsVerticalScrollIndicator={false}
         renderItem   = {({ item }) =><SectorItem toggleSector={toggleSector} sector={item.sector} navigation={navigation} index={item.index} opened={item.opened} clients={item.clients}  />}
         keyExtractor = {(item, index) => index.toString()}
        />
    </View>
    
  )
}


export default connect(
  state=>({
      todaysSectors : state.client.todaysSectors
  }),
  dispatch=>({
      fetchTodaysSectors : dispatch.client.fetchTodaysSectors
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
  item:{
      marginBottom:8
  }
});

