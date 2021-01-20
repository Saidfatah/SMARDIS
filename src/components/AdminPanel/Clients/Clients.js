import React,{useState,useEffect} from 'react'
import {View,Text,FlatList,StyleSheet} from 'react-native'
import {AutoDragSortableView } from 'react-native-drag-sort'
import Item from '../../Common/Item'


const  Clients=()=> {
    const [clientsList, setclientsList] = useState([])
    const PARENT_WIDTH = "100%"
    const CHILDREN_WIDTH = "100%"
    const CHILDREN_HEIGHT =  50
    
    useEffect(() => {
      setclientsList([])
    }, [])

    return (
        <View>
          <AutoDragSortableView
              dataSource={clientsList}
              parentWidth={PARENT_WIDTH}
              childrenWidth= {CHILDREN_WIDTH}
              childrenHeight={CHILDREN_HEIGHT}
              keyExtractor={(item,index)=> index}
              renderItem={(item,index)=>{
                  return <Item>
                    <Text> {item.name} </Text>
                  </Item>
              }}
          />  
        </View>
    )
}

export default Clients
