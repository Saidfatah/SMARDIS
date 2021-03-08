import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,Dimensions,Modal,TouchableWithoutFeedback} from 'react-native'
import {AutoDragSortableView} from 'react-native-drag-sort'
import {colors} from '../../../Common/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'

const {width} = Dimensions.get('window')
const PARENT_WIDTH = width
const SPACING = 16
const CHILDREN_WIDTH = width - SPACING
const CHILDREN_HEIGHT = 30
const CONTAINER_HEIGHT= 200

const ClientsOrdering=({dispatch,setData,Data})=> {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)
 
    
    

    const renderItem=(item,index)=>{
        return <View style={styles.item}>
            <Text style={styles.item_txt}>{item.name}</Text>
        </View>
    }
    const clickItem=(data,item,index)=>{
        if(selectedIndex != null){
            if(selectedIndex == index) return
            //replace click item with 
            let tempData = [...Data]
            
             var selectedItem = tempData[selectedIndex];
             tempData[selectedIndex] = tempData[index];
             tempData[index] = selectedItem;
            
             setData([...tempData])
             dispatch({type:'SET_ORDERD_LIST_OF_CLIENTS',value:tempData})
             dispatch({type:'SET_ORDERD_CLIENTS',value:true})
             setSelectedIndex(null)
        }else{
             setSelectedIndex(index)
        }
    }

    const AutoDragableComponent=()=>{
       return <AutoDragSortableView
          dataSource={Data}
          parentWidth={PARENT_WIDTH}
          childrenWidth= {CHILDREN_WIDTH}
          childrenHeight={CHILDREN_HEIGHT}
          marginChildrenLeft={SPACING/2}
          marginChildrenBottom={2}
          marginChildrenTop={2}
          isDragFreely={true}
          slideDuration={.5}
          scaleDuration={100}
          maxScale={1.05}
        //   onDragStart={e=> }
        //   onDragEnd={e=> }
          onClickItem={clickItem}
          onDataChange={orderdData=>{
            setData([...orderdData])
            dispatch({type:'SET_ORDERD_CLIENTS',value:true})
            dispatch({type:'SET_ORDERD_LIST_OF_CLIENTS',value:orderdData})
          }}
          keyExtractor={(item,index)=> index}
          renderItem={renderItem}
       /> 
    }

    return  <View style={{flex:1}} >
         <TouchableWithoutFeedback style={{ ...styles.openButton  }} onPress={()=>{ 
             setModalVisible(true);
             }}>
              <View style={styles.sort} >
                  <Text>Réorganiser les clients </Text>
              </View>
         </TouchableWithoutFeedback>
        <Modal
         animationType='slide'
         transparent={true}
         visible={modalVisible}
         onRequestClose={() => {
           Alert.alert("Modal has been closed.");
         }}
         >
          <View style={styles.centeredView} >
                 <View style={styles.modalView}> 
                    <View style={styles.modalHeader} >
                        <TouchableWithoutFeedback
                          style={{ ...styles.openButton  }}
                          onPress={()=>{
                            setModalVisible(!modalVisible);
                            }}>
                          <Icon name="close" size={20} color={colors.RED} />
                        </TouchableWithoutFeedback>
                    </View>
                    <AutoDragableComponent />
                 </View>
          </View>
         </Modal>
     </View>
}


export default  ClientsOrdering
 

const styles = StyleSheet.create({
    sort: {
        padding:8,
        borderColor:colors.BLACK,
        borderWidth:2,
        borderRadius:6, 
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      modalView: {
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation:20,
      },
      openButton: {
        backgroundColor: "#fff",
        elevation:10,
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      modalBody:{
          padding:8
      },
      modalHeader:{
          padding:8
      },
})
