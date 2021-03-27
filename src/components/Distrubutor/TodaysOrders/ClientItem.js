import React from 'react'
import {View,Text} from 'react-native'
import Item from '../../Common/Item'
import Button from '../../Common/Button'
import { connect } from 'react-redux'

const ClientItem=({navigation,client,selectClient,currentTurn,currentSector,sector,scheduleId })=> {

     const {name,turn,orderId}=client
     
    const onClick=(e)=>{
       navigation.navigate('DISTRIBUTORclientDelivery', { clientId:client.id ,sector,orderId,scheduelId:scheduleId });
       selectClient({id:client.id })
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
             noLoading={true}
             disabled={turn > currentTurn  ||  currentSector != sector.id
                     ?true
                     :false
             }
            
             clickHandler={onClick} 
             >
                <Text style={{color:"#fff",textAlign:'center',fontWeight:'bold'}}>  Afficher </Text>
            </Button>
        </View>
      </Item>
}

export default  connect(
  null,
  dispatch=>({selectClient:dispatch.client.selectClient})
)(ClientItem)
