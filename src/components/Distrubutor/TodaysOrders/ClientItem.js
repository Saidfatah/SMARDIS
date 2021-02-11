import React from 'react'
import {View,Text} from 'react-native'
import Item from '../../Common/Item'
import Button from '../../Common/Button'

const ClientItem=({navigation,client,currentSectorIndex,currentTurn,currentSector,sector })=> {
      const {name,turn,orderId}=client
      const navigateToRoute=(e)=>navigation.navigate('DISTRIBUTORclientDelivery', { clientId:client.id ,client ,sector,orderId });
      console.log({turn,currentTurn})
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
             noLoading={true}
             disabled={turn > currentTurn  ||  currentSector != sector.id
                     ?true
                     :false
             }
            
             clickHandler={navigateToRoute} 
             >
                <Text style={{color:"#fff",textAlign:'center',fontWeight:'bold'}}>  Afficher </Text>
            </Button>
        </View>
      </Item>
}

export default ClientItem
