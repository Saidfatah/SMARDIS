import React,{useEffect} from 'react'
import {View,FlatList,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import ClientItem from './ClientItem'
import Loading from '../../../Common/Loading'

const  Clients=({navigation,clients,fetchMoreClients,fetchClients})=> {
    useEffect(() => {
      fetchClients()
    }, [])

    const handleLoadMore=()=>{
      console.log('laodmore')
      fetchMoreClients()
  }

  if(clients.length < 1 ) 
  return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
      <Loading spacing={50} />   
  </View>


    return (
        <View style={{backgroundColor:'#fff',flex: 1}} >
         <FlatList 
         data   = {clients}
         style  = {{...styles.list}}
         contentContainerStyle = {props =>(styles.flatList)}
         showsVerticalScrollIndicator={false}
         onEndReached={e=>handleLoadMore()}
         onEndReachedThreshold={0.5}
         ListFooterComponent={<View style={{ height: 0, marginBottom: 90 }}></View>}
         renderItem   = {({ item ,index}) =><ClientItem  
              key={index}  
              navigation={navigation} 
              client={item}  
              isInTodaysOrders={false}
              onclick={()=>navigation.navigate('ADMINclientProfile',{client:item})}
         />}
         keyExtractor = {(item, index) => index.toString()}
        />
        </View>
    )
}

export default connect(
  state=>({
     clients : state.client.clients
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



