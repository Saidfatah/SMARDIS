import React,{useState,useEffect} from 'react'
import {View,Text,FlatList,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Item from '../../../Common/Item'
import Button from '../../../Common/Button'



const  Clients=({navigation,clients,fetchClients,fetchMore})=> {
    useEffect(() => {
      fetchClients()
    }, [])

    const RenderItem =({client,fetchMore})=>{
      const {name}=client
      return <Item xStyle={{ marginBottom:16}} >
        <View style={{ 
          display:'flex',
          flexDirection:'row-reverse' ,
          justifyContent:'space-between',
          alignItems:'center',
          paddingLeft:16
          }}>
            <Text style={{flex:1,fontWeight:'bold',textAlign:'right'}}>{name}</Text>
            <Button
             xStyle={{flex:1,margin:0,borderRadius:12}} 
             color={"BLUE"} 
             clickHandler={e=>navigation.navigate('ADMINclientProfile',{client})} 
             >
                <Text style={{color:"#fff",textAlign:'center',fontWeight:'bold'}}>Afficher</Text>
            </Button>
        </View>
      </Item>
    }

    return (
        <View>
         <FlatList 
         data   = {clients}
         style  = {{...styles.list}}
         contentContainerStyle = {props =>(styles.flatList)}
         showsVerticalScrollIndicator={false}
         onEndReached={e=> {
           console.log('reached end')
           setTimeout(()=>fetchMore(),2000)
          }}
         renderItem   = {({ item ,index}) =><RenderItem  key={index}  client={item}  />}
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
     fetchMore    : dispatch.client.fetchMore,
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



