import React,{useEffect} from 'react'
import {View,FlatList,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import ClientItem from './ClientItem'



const  Clients=({navigation,clients,fetchClients})=> {
    useEffect(() => {
      // fetchClients()
    }, [])



    return (
        <View>
         <FlatList 
         data   = {clients}
         style  = {{...styles.list}}
         contentContainerStyle = {props =>(styles.flatList)}
         showsVerticalScrollIndicator={false}
         onEndReached={e=> {
           console.log('reached end')
          //  setTimeout(()=>fetchMore(),2000)
          }}
         renderItem   = {({ item ,index}) =><ClientItem  key={index}  navigation={navigation} client={item}  />}
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
  })
)(Clients)


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



