import React,{useEffect,useState} from 'react'
import {View,Text,ScrollView,StyleSheet,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import Button from '../../../Common/Button'
import Item from '../../../Common/Item'
import {colors} from '../../../Common/Colors'
import Badge from '../../../Common/Badge'
import Label from '../../../Common/Label'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'


//distrubutor activity 
//valide commands 
//last sector
//sectors
//some charts
export const DistrubutorPage = ({navigation,route,done_removing_distrubutor,removeDistrubutor}) => {
    const [canRemove, setcanRemove] = useState(true)
    const {distrubutor} = route.params;
    
    useEffect(() => {
        done_removing_distrubutor ==true && setcanRemove(true) && resetIsDone("done_removing_distrubutor")
    }, [done_removing_distrubutor])
    useEffect(() => {
        navigation.setParams({DISTRUBUTOR_NAME:distrubutor.name})
  
    }, [])



    const {name}=distrubutor
  
    return (
        <ScrollView 
        contentContainerStyle={styles.contentContainer}  
        style={styles.container} >  
           <View   >
                <View style={styles.HFlex} >
                    <Label label="Nom :"  mga={16} />
                    <View style={{...styles.productItem,marginBottom:0,marginLeft:8}}>
                         <Text> {name} </Text>
                         
                    </View>
                </View>
           </View>
 
           <View style={styles.btns} >
               <Button
                xStyle={{...styles.BtnXstyle}} 
                color={"RED"} 
                disabled={!canRemove}
                clickHandler={e=>{
                    setcanRemove(false)
                    removeDistrubutor({distrubutor,admin:0,navigation})
                }} 
                >
                     <Text style={styles.ButtonText}>Supprimer Le vendeur</Text>
                     <IonIcon name="trash" size={25} color="#fff" />
               </Button>
        </View>
    </ScrollView>
    )
}

 

export default connect(
    state=>({
        done_removing_distrubutor:state.distrubutor.done_removing_distrubutor
    }), 
    dispatch =>({
      removeDistrubutor: dispatch.distrubutor.removeDistrubutor,
      resetIsDone: dispatch.distrubutor.resetIsDone,
    })
)(DistrubutorPage)

const styles = StyleSheet.create({
    clientPage:{
        backgroundColor:"#fff",
        padding:8,
        height:"100%"
    },
    productItem: {
        display:'flex',
        flexDirection:'row',
        padding:8,
        backgroundColor:'#fff',
        elevation:5,
        borderRadius:12,
        marginRight:8,
        marginBottom:8,
    },
    clientsItemsWrapper: {
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    HFlex: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    ButtonText:{
        color:"#fff",
        textAlign:'center',
        fontWeight:'bold'
    },
    BtnXstyle:{
        margin:0,
        borderRadius:12,
        height:50,
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-evenly",
        marginBottom:8
    },
    btns:{
        display:'flex',
        marginTop:16,
        justifyContent:'flex-start',
        alignItems:"flex-start"
    },
    contentContainer:{ 
        display:'flex', 
        justifyContent:'space-between', 
        flexGrow:1 
    },
    container:{
        height:'100%',
        padding:8,
        backgroundColor:'#fff',
        display:'flex',
    },
    accordionContentWrrapper: {
        padding:8,
        backgroundColor:'#fff',
        elevation:5,
        marginBottom:16,
        borderBottomLeftRadius:12,
        borderBottomRightRadius : 12
    },
    AcordionHeader: {
        padding:8,
        backgroundColor:'#fff',
        elevation:5,
        borderRadius:12,
       
    },
    Title: {
        color:colors.BLACK,
        fontWeight:'bold'
    },
})

