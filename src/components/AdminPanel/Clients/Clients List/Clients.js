import React  from 'react'
import {View,FlatList,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import ClientItem from './ClientItem'
import Loading from '../../../Common/Loading'

const  Clients=({navigation,clients,done_fetching_clients,fetchClients})=> {
 
  

    if(clients.length < 1 && !done_fetching_clients ) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>

    const renderItem =({ item ,index}) =><ClientItem  
    key={index}  
    navigation={navigation} 
    client={item}  
    isInTodaysOrders={false}
    onclick={()=>navigation.navigate('ADMINclientProfile',{client:item})}
    />

    return (
        <View style={{backgroundColor:'#fff',flex: 1}} >
         <FlatList 
         data   = {clients.filter(c=>c.confirmed !="PENDING")}
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
     clients : state.client.clients,
     done_fetching_clients : state.client.done_fetching_clients,
  }),
  dispatch =>({
     fetchClients : dispatch.client.fetchClients,
     fetchMoreClients : dispatch.client.fetchMoreClients,
  })
)(Clients)


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



