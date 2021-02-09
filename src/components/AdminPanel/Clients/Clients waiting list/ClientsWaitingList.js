import React,{useEffect} from 'react'
import {View,FlatList,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import ClientItem from './ClientItem'
import Loading from '../../../Common/Loading'

const  ClientsWaitingList=({navigation,waiting_clients,done_fetching_waiting_clients})=> {
    if(waiting_clients.length < 1 && !done_fetching_waiting_clients ) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
      <Loading spacing={50} />   
  </View>


    return (
        <View style={{backgroundColor:'#fff',flex: 1}} >
         <FlatList 
         data   = {waiting_clients}
         style  = {{...styles.list}}
         contentContainerStyle = {props =>(styles.flatList)}
         showsVerticalScrollIndicator={false}
         ListFooterComponent={<View style={{ height: 0, marginBottom: 90 }}></View>}
         renderItem   = {({ item ,index}) =><ClientItem  
              key={index}  
              navigation={navigation} 
              client={item}  
              isInTodaysOrders={false}
             
         />}
         keyExtractor = {(item, index) => index.toString()}
        />
        </View>
    )
}

export default connect(
  state=>({
     waiting_clients : state.client.waiting_clients,
     done_fetching_waiting_clients : state.client.done_fetching_waiting_clients,
  }),
 null
)(ClientsWaitingList)


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



