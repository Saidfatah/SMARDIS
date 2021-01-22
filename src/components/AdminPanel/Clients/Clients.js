import React,{useState,useEffect} from 'react'
import {View,Text,} from 'react-native'
import { connect } from 'react-redux'




const  Clients=({clients})=> {
    const [clientsList, setclientsList] = useState([])
    
    useEffect(() => {
      setclientsList([])
    }, [])

 
    return (
        <View>
          <Text>clients list here </Text>
          <Text>can be modifed and removed and added via redrects from here </Text>
        </View>
    )
}

export default connect(
  state=>({
     clients : state.client.clients
  }),
  null
)(Clients)


