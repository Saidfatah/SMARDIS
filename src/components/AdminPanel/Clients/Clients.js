import React,{useState,useEffect} from 'react'
import {View,Text,FlatList,StyleSheet,Dimensions,SafeAreaView} from 'react-native'
import {AutoDragSortableView} from 'react-native-drag-sort'
import { connect } from 'react-redux'
import Item from '../../Common/Item'
const {width,height} = Dimensions.get('window')

const PARENT_WIDTH = width
const CHILDREN_WIDTH = width - 20
const CHILDREN_HEIGHT = 48


const  Clients=({clients})=> {
    const [clientsList, setclientsList] = useState([])
    
    useEffect(() => {
      setclientsList([])
    }, [])

 
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sort}>
                <AutoDragSortableView
                  dataSource={clients}
                  parentWidth={PARENT_WIDTH}
                  childrenWidth= {CHILDREN_WIDTH}
                  childrenHeight={CHILDREN_HEIGHT}
                  marginChildrenBottom={10}
                  marginChildrenRight={10}
                  marginChildrenLeft = {10}
                  marginChildrenTop={10}
                  isDragFreely={true}
                  keyExtractor={(item,index)=> index}
                  renderItem={(item,index)=>{
                      return <View style={styles.item}>
                      <View style={styles.item_children}>
                          <Text style={styles.item_txt}>{item.name}</Text>
                      </View>
                  </View>
                  }}
                 /> 
            </View>
        </SafeAreaView>
    )
}

export default connect(
  state=>({
     clients : state.client.clients
  }),
  null
)(Clients)


const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 20,
  },
  sort: {
      flex: 1,
  },
  item: {
      width: CHILDREN_WIDTH,
      height: CHILDREN_HEIGHT,
  },
  item_children: {
      //margin: 4,
      width: CHILDREN_WIDTH-4,
      height: CHILDREN_HEIGHT-4,
      margin: 2,
      backgroundColor: '#957be7',
      justifyContent: 'center',
      alignItems: 'center',
  },
  item_icon: {
      width: CHILDREN_HEIGHT/2,
      height: CHILDREN_HEIGHT/2,
      resizeMode: 'contain',
  },
  item_txt: {
      fontSize: 18,
      color: '#fff'
  },


})