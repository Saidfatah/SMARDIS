import React from 'react'
import {View,Text} from 'react-native'
import Item from '../../../Common/Item'
import Button from '../../../Common/Button'

const ClientItem=({navigation,client})=> {
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
             clickHandler={e=>navigation.navigate('ADMINupdateClient',{client,update:true})} 
             >
                <Text style={{color:"#fff",textAlign:'center',fontWeight:'bold'}}>  Modifier </Text>
            </Button>
        </View>
      </Item>
}

export default ClientItem
