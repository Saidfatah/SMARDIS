import React from 'react'
import {View,Text,TouchableHighlight,Modal,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {colors} from './Colors'


export const ModalWrraper = ({modalVisible, setModalVisible,children,onClose}) => {
    
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        >
          <View style={styles.centeredView} >
             <View style={styles.modalView}>
                    <View style={styles.modalHeader} >
                       <TouchableHighlight
                         style={{ ...styles.openButton  }}
                         onPress={()=>{
                           setModalVisible(!modalVisible);
                           if(onClose) onClose()
                           }}>
                         <Icon name="close" size={20} color={colors.RED} />
                       </TouchableHighlight>
                    </View>
                    <View style={styles.modalBody} >
                       {children}
                    </View>
             </View>
          </View>
      </Modal>
    )
}



export default ModalWrraper
const styles = StyleSheet.create({
centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
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
});