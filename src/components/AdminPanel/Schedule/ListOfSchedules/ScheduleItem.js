import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,Alert} from 'react-native'
import { List } from 'react-native-paper';
import {colors} from '../../../Common/Colors'
import Badge from '../../../Common/Badge'
import Label from '../../../Common/Label'
import Button from '../../../Common/Button'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'

export const ScheduleItem = ({navigation,scheduel,removeScheduel,done_removing_scheduel}) => {
    const [expanded, setExpanded] = useState(false);
    const [canRemove, setcanRemove] = useState(true)
    const handlePress = () => setExpanded(!expanded);
    const {admin,distrubutor,distination,status,date,start_date} = scheduel
    
    useEffect(() => {
        done_removing_scheduel == true && setcanRemove(true) &&resetIsDone('done_removing_scheduel')
    }, [done_removing_scheduel])

    return (
        <List.Accordion
         title={`${distrubutor.name} (${distination.sector.name})` }
         titleStyle={styles.Title}
         style={{
             ...styles.AcordionHeader,
             borderBottomLeftRadius: !expanded ?12:0,
             borderBottomRightRadius:!expanded ?12:0 ,
             marginBottom: expanded ?0:16 ,
         }}
         descriptionStyle={styles.AcordionWrrapper}
         expanded={expanded}
         onPress={handlePress}>
           <View style={styles.accordionContentWrrapper}>
                <View style={styles.HFlex} >
                    <Label label="Status :"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                              <Text>{status =='PENDING'?"pas encour":"Valider"}</Text>
                    </View>
                </View>
                <View style={styles.HFlex} >
                    <Label label="Date de debut :"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                              <Text>{new Date(start_date).toLocaleDateString('en-US')}</Text>
                    </View>
                </View>
                <View style={styles.HFlex} >
                    <Label label="Admin :"  mga={16} />
                     <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                           <Text>{admin.name}</Text>
                     </View>
                </View>
                <View style={styles.HFlex} >
                    <Label label="Secteur :"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                         <Text>{distination.sector.name}</Text>
                    </View>
                </View>
                
           
                <Label label="Liste ordonnée des clients"  mga={16} />
                <View style={styles.clientsItemsWrapper}>
                    {
                       distination.clients.map((c,i)=><View key={i} style={styles.ClientItem}>
                             <Text>{c.name}</Text>
                              <Badge value={i+1} status="primary" />
                       </View>)
                    }
                    
                </View>
          
                <View style={styles.btns} >
               <Button
                xStyle={{...styles.BtnXstyle}} 
                color={"RED"} 
                disabled={!canRemove}
                clickHandler={e=>{
                    Alert.alert("Suppression!", "Etes-vous sûr que vous voulez supprimer? ", [
                        {
                          text: "Annuler",
                          onPress: () => null,
                          style: "cancel"
                        },
                        { text: "OUI", onPress: () =>{
                            setcanRemove(false)
                            removeScheduel(scheduel.id)
                        }
                       }
                      ]);
                }} 
                >
                     <Text style={styles.ButtonText}>Supprimer Le trajet</Text>
                     <IonIcon name="trash" size={25} color="#fff" />
               </Button>
          
               <Button
                xStyle={styles.BtnXstyle} 
                color={"BLUE"} 
                clickHandler={e=>navigation.navigate('ADMINupdateSchedule',{scheduel,update:true})} 
                >
                   <Text style={styles.ButtonText}>Modifier Le Trajet</Text>
                   <IonIcon name="ios-settings-sharp" size={25} color="#fff" />
             </Button>
        </View>
          </View>
     </List.Accordion>
    )
}
 
export default connect(
    state=>({
        done_removing_scheduel:state.scheduel.done_removing_scheduel,
    }),
    dispatch=>({
        removeScheduel:dispatch.scheduel.removeScheduel,
        resetIsDone:dispatch.scheduel.resetIsDone,
    })
)(ScheduleItem)
   

const styles = StyleSheet.create({
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
    btns:{
        flex:1,
        display:'flex',
        marginTop:16,
        marginBottom:16,
        justifyContent:'flex-start',
        alignItems:"flex-start"
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
    ButtonText:{color:"#fff",textAlign:'center',fontWeight:'bold'},
})

