import React,{memo,useRef,useEffect} from 'react'
import {View,Text} from 'react-native'
import Item from '../../../Common/Item'
import Button from '../../../Common/Button'

const ClientItem=({navigation,client })=> {
  let ref= useRef(0)
 
  ref.current= ref.current +1 

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
             clickHandler={ e=>navigation.navigate('ADMINclientProfile',{client})} 
             >
                <Text style={{color:"#fff",textAlign:'center',fontWeight:'bold'}}>Afficher
               </Text>
            </Button>
        </View>
  </Item>
}


const isEqual=(prevProps,nextProps)=>{
  const prevItem =prevProps.client 
  const nextItem =nextProps.client 
  
  if(prevItem["objectif"].initial != nextItem["objectif"].initial){
    return false
  } 
  if(prevItem["objectif"].last_mounth != nextItem["objectif"].last_mounth){
    return false
  } 
  if(prevItem["objectif"].progress != nextItem["objectif"].progress){
    return false
  } 
  if(prevItem["name"] != nextItem["name"]){
    return false
  } 
  if(prevItem["price"] != nextItem["price"]){
    return false
  } 
  if(prevItem["order_in_sector"] != nextItem["order_in_sector"]){
    return false
  } 
  if(prevItem["coardinations"] != nextItem["coardinations"]){
    return false
  } 
  if(prevItem["phone"] != nextItem["phone"]){
    return false
  } 
  if(prevItem["confirmed"] != nextItem["confirmed"]){
    return false
  } 
  if(prevItem["city"] != nextItem["city"]){
    return false
  } 
  if(prevItem["credit"] != nextItem["credit"]){
    return false
  } 
  if(prevItem["address"] != nextItem["address"]){
    return false
  } 
  if(prevItem["sectorId"] != nextItem["sectorId"]){
    return false
  } 

 
  return true
}
 

export default memo(ClientItem,isEqual)
