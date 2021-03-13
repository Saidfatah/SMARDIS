import React,{useEffect,useState} from 'react'
import {View,Text,ScrollView,StyleSheet,Alert} from 'react-native'
import { connect } from 'react-redux'
import Label from '../../../Common/Label'
import Button from '../../../Common/Button'
import Badge from '../../../Common/Badge'
import Loading from '../../../Common/Loading'
import {colors} from '../../../Common/Colors'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { List } from 'react-native-paper';
import ClientItem from '../../Clients/Clients List/ClientItem'

export const SecorPage = (props) => {
    const  {
        navigation,
        removeSector,
        route,
        fetchSectorClients,
        selected_sector_Clients,
        visited_Sector_has_clients
    }=props

    const [isExpanded, setisExpanded] = useState(false)

    const {sector} = route.params;
    const {city,name,id}=sector
    
    useEffect(() => {
        fetchSectorClients(id)
        navigation.setParams({SECTOR_NAME:name})
    }, [fetchSectorClients])


    if(!sector) return <Text>Client nexst pas</Text>

    if(selected_sector_Clients.length < 1 && visited_Sector_has_clients==true ) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>

    
    const ACCORDION_PROPS={
        title:<View style={{
            flex:1,
            display:'flex',
            flexDirection:'row',
            width : '100%',
            justifyContent:'space-between',
            }}>
            <Text>{name}</Text>
            <Badge
              status={selected_sector_Clients.length >0 ?"success":"warning"}
              value={(selected_sector_Clients.length).toString()}
               textStyle={{
                 fontSize:14
               }}
               containerStyle={{marginLeft:16}}
               badgeStyle={{ 
                  height:24 ,
               }}
            />
        </View>,
        titleStyle: styles.Title,
        style:{
            ...styles.AcordionHeader,
            borderBottomLeftRadius: !isExpanded ?12:0,
            borderBottomRightRadius:!isExpanded ?12:0 ,
            marginBottom: isExpanded ?0:16 ,
        },
        descriptionStyle:styles.AcordionWrrapper,
        expanded:isExpanded,
        onPress:()=>setisExpanded(!isExpanded)
    }
    return (
        <ScrollView contentContainerStyle={{ display:'flex',  flexGrow:1}}  style={styles.SecorPage} >
            <View style={styles.HFlex} >
                    <Label label="Nom :"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                         <Text> {name} </Text>
                    </View>
            </View>
            
            <View style={styles.HFlex} >
                    <Label label="Vile :"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                         <Text> {city} </Text>
                    </View>
            </View>
            
           
            <List.Section title={"Clients du secteur"}>
                 <List.Accordion  {...ACCORDION_PROPS} >
                       <View style={styles.accordionContentWrrapper}>
                        {
                        selected_sector_Clients.map((sCl,index)=><ClientItem  
                             key={index}  
                             navigation={navigation} 
                             client={sCl}  
                             isInTodaysOrders={false}
                             onclick={()=>navigation.navigate('ADMINclientProfile',{client:sCl})}
                        />)
                        }  
                       </View>
                 </List.Accordion>
            </List.Section>
        
           <View style={styles.btns} >
               <Button
                xStyle={styles.BtnXstyle} 
                color={"BLUE"} 
                clickHandler={e=> navigation.navigate('ADMINupdateSector',{update:true,sector})} 
                >
                   <Text style={styles.ButtonText}>Modifier Le Secteur</Text>
                   <IonIcon name="ios-settings-sharp" size={25} color="#fff" />
               </Button>
               <Button
                xStyle={styles.BtnXstyle} 
                color={"RED"} 
                clickHandler={e=>{
                    Alert.alert("Suppression!",  "Etes-vous sûr que vous voulez supprimer? ", [
                        {
                          text: "Annuler",
                          onPress: () => null,
                          style: "cancel"
                        },
                        { text: "OUI", onPress: () =>{
                            removeSector({id,name,navigation})
                        }
                       }
                      ]);
                    
                }} 
                >
                   <Text style={styles.ButtonText}>Supprimer Le Secteur</Text>
                   <IonIcon name="trash" size={25} color="#fff" />
               </Button>
        </View>
    </ScrollView>
    )
}

 

export default connect(
    state=>({
        selected_sector_Clients   : state.sector.selected_sector_Clients,
        visited_Sector_has_clients: state.sector.visited_Sector_has_clients,
    }),
    dispatch=>({
        fetchSectorClients: dispatch.sector.fetchSectorClients,
        removeSector: dispatch.sector.removeSector,
    }),
)(SecorPage)

const styles = StyleSheet.create({
    SecorPage:{
        backgroundColor:"#fff",
        padding:8,
        height:"100%"
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
})

