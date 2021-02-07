import React,{useState,useEffect} from 'react'
import {View,Text,ScrollView,StyleSheet,Linking} from 'react-native'
import { connect } from 'react-redux'
import Item from '../../../Common/Item'
import Button from '../../../Common/Button'
import {colors} from '../../../Common/Colors'
import Badge from '../../../Common/Badge'
import Label from '../../../Common/Label'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'



export const ClientPage = ({navigation,route,sectors,resetIsDone,done_removing_client,removeClient}) => {
    const [canRemove, setcanRemove] = useState(true)
    const {client} = route.params;
    useEffect(() => {
        done_removing_client==true && setcanRemove(true) && resetIsDone('done_removing_client')
    }, [done_removing_client])

    if(!client) return <Text>Client nexst pas</Text>
    if(sectors.length<1) return <Text>loading</Text>

    const {phone,city,ref,name,address,objectif,price,sectorId}=client
    return (
        <ScrollView contentContainerStyle={{ display:'flex',  flexGrow:1}}  style={styles.clientPage} >
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
                    <View style={{...styles.ClientItem,marginBottom:0}}>
                        <Badge mgl={0} status={"success"}  value={price.toString()} />
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
                xStyle={{...styles.BtnXstyle}} 
                color={"RED"} 
                disabled={!canRemove}
                clickHandler={e=>{
                    setcanRemove(false)
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
               <Button
                xStyle={styles.BtnXstyle} 
                color={"BLUE"} 
                clickHandler={e=>navigation.navigate('ADMINupdateClient',{client,update:true})} 
                >
                   <Text style={styles.ButtonText}>Modifier Le Client</Text>
                   <IonIcon name="ios-settings-sharp" size={25} color="#fff" />
             </Button>
        </View>
    </ScrollView>
    )
}

 

export default connect(
    state=>({
       sectors:state.sector.sectors,
       done_removing_client:state.client.done_removing_client,
    }), 
    dispatch =>({
      removeClient: dispatch.client.removeClient,
      resetIsDone: dispatch.client.resetIsDone,
    })
)(ClientPage)

const styles = StyleSheet.create({
    clientPage:{
        backgroundColor:"#fff",
        padding:8,
        height:"100%"
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
    container:{
        height:'100%',
        padding:8,
        backgroundColor:'#fff'
    },
    btns:{
        flex:1,
        display:'flex',
        marginTop:16,
        marginBottom:16,
        justifyContent:'flex-start',
        alignItems:"flex-start"
    }
})

