import React,{memo,useRef,useEffect} from 'react'
import {View,Text} from 'react-native'
import Item from '../../../Common/Item'
import Button from '../../../Common/Button'
import { connect } from 'react-redux'

const ClientItem=({navigation,client,selectClient })=> {
  let ref= useRef(0)
  const {name,id}=client
 
 
  ref.current= ref.current +1 

  const onClick=(e)=>{
     selectClient({id})
     navigation.navigate('ADMINclientProfile')
  }

 
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
             clickHandler={onClick} 
             >
                <Text style={{color:"#fff",textAlign:'center',fontWeight:'bold'}}>Afficher
               </Text>
            </Button>
        </View>
  </Item>
}


const isEqual=(prevProps,nextProps)=>{
  const prevItem =prevProps 
  const nextItem =nextProps 
  

  if(prevItem.client['name'] != nextItem.client['name']){
    return false
  } 
  if(prevItem.client['id'] != nextItem.client['id']){
    return false
  } 
 
  return true
}

export default  connect(
   null,
   dispatch=>({selectClient:dispatch.client.selectClient})
)(memo(ClientItem,isEqual))


