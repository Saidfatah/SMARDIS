import React from 'react'
import {View,Text,FlatList,StyleSheet,Linking} from 'react-native'
import { connect } from 'react-redux'
import Item from '../../../Common/Item'
import Button from '../../../Common/Button'
import {colors} from '../../../Common/Colors'
import Badge from '../../../Common/Badge'
import Label from '../../../Common/Label'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'

//rmove client 
//update client Link 
//display info 

export const ClientPage = ({navigation,route,sectors,removeClient}) => {
    const {client} = route.params;

  

    if(!client) return <Text>Client nexst pas</Text>

    const {phone,city,ref,name,address,objectif,price,sectorId}=client
    return (
        <View style={styles.clientPage} >
            <View style={styles.HFlex} >
                    <Label label="Nom :"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                         <Text> {name} </Text>
                    </View>
            </View>
            <View style={styles.HFlex} >
                    <Label label="Ref :"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                         <Text> {ref} </Text>
                    </View>
            </View>
            <View style={styles.HFlex} >
                    <Label  label="Prix :"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                        <Badge  status={"success"} value={price.toString()+"DH"} />
                    </View>
            </View>
            <View style={styles.HFlex} >
                    <Label label="Objectif du client :"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                         <Badge  status={"success"}  value={ objectif+".00 DH"} />
                    </View>
            </View>
            <View style={styles.HFlex} >
                    <Label label="Address :"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                         <Text> {address} </Text>
                    </View>
            </View>
            <View style={styles.HFlex} >
                    <Label label="Téléphone :"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                         <Text> {phone} </Text>
                    </View>
            </View>
            <View style={styles.HFlex} >
                    <Label label="Ville :"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                         <Text> {city} </Text>
                    </View>
            </View>
            <View style={styles.HFlex} >
                    <Label label="Secteur :"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                         <Text> {sectors && sectors.filter(s=>s.id == sectorId)[0].name} </Text>
                    </View>
            </View>
        <View style={styles.btns} >
               <Button
                xStyle={{...styles.BtnXstyle,marginRight:16}} 
                color={"RED"} 
                clickHandler={e=>{
                    removeClient({client,admin:0})
                    navigation.goBack()
                }} 
                >
                     <Text style={styles.ButtonText}>Supprimer Le client</Text>
                     <IonIcon name="trash" size={25} color="#fff" />
               </Button>
               <Button
                xStyle={styles.BtnXstyle} 
                color={"GREEN"} 
                clickHandler={e=>Linking.openURL(`tel:${phone}`)} 
                >
                   <Text style={styles.ButtonText}>Appeler Le Client</Text>
                   <Icon name="call" size={25} color="#fff" />
             </Button>
        </View>
    </View>
    )
}

 

export default connect(
    state=>({
       sectors:state.client.sectors
    }), 
    dispatch =>({
      removeClient: dispatch.client.removeClient
    })
)(ClientPage)

const styles = StyleSheet.create({
    clientPage:{
        flex:1,
        backgroundColor:"#fff",
        padding:8
    },
    ClientItem: {
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
    ButtonText:{color:"#fff",textAlign:'center',fontWeight:'bold'},
    BtnXstyle:{
        flex:1,
        margin:0,
        borderRadius:12,
        height:50,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    container:{
        height:'100%',
        padding:8,
        backgroundColor:'#fff'
    },
    btns:{
        flex:1,
        display:'flex',
        flexDirection:'row',
        marginTop:16,
        marginBottom:16,
        justifyContent:'space-between',
        alignItems:"flex-end"
    }
})

