import React from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native'
import {AutoDragSortableView} from 'react-native-drag-sort'
import {colors} from '../../../Common/Colors'

const {width} = Dimensions.get('window')
const PARENT_WIDTH = width
const SPACING = 16
const CHILDREN_WIDTH = width - (SPACING*2)-5-16
const CHILDREN_HEIGHT = 30
const CONTAINER_HEIGHT= 200

const ClientsOrdering=({sectorClients,dispatch})=> {
    return  <View style={styles.sort}>
            <AutoDragSortableView
              dataSource={sectorClients}
              parentWidth={PARENT_WIDTH}
              childrenWidth= {CHILDREN_WIDTH}
              childrenHeight={CHILDREN_HEIGHT}
              marginChildrenBottom={10}
              marginChildrenTop={10}
              isDragFreely={true}
              onDragStart={e=> dispatch({type:'SET_SCROLL_ENABLE',value:false})}
              onDragEnd={e=>dispatch({type:'SET_SCROLL_ENABLE',value:true})}
              onDataChange={orderdData=>{
                dispatch({type:'SET_ORDERD_LIST_OF_CLIENTS',value:orderdData})
              }}
              keyExtractor={(item,index)=> index}
              renderItem={(item,index)=>{
                  return <View style={styles.item}>
                      <Text style={styles.item_txt}>{item.name}</Text>
              </View>
              }}
             /> 
        </View>
}

export default ClientsOrdering

const styles = StyleSheet.create({
    sort: {
        padding:SPACING,
        borderColor:colors.BLACK,
        borderWidth:2,
        borderRadius:12, 
        height:CONTAINER_HEIGHT,

    },
    item: {
        width: CHILDREN_WIDTH,
        height: CHILDREN_HEIGHT,
        backgroundColor:'#fff',
        display:'flex',
        justifyContent:'center',
        borderRadius:12 ,
        borderColor:colors.BLACK,
        borderWidth:2,
        borderRadius:12, 
    },
    item_txt: {
        fontSize: 18,
        color: colors.BLACK,
        textAlign:"center"
    }
})
