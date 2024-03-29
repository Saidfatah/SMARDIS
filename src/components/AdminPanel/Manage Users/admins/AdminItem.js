import React,{useState,useEffect} from 'react'
import {Text,StyleSheet,Alert} from 'react-native'
import { List } from 'react-native-paper';
import {colors} from '../../../Common/Colors'
import Button from '../../../Common/Button'
import { View } from 'native-base';


export const AdminItem = ({user,setMaster,resetIsDone,done_setting_admin_to_master}) => {
    const [canSubmit, setcanSubmit] = useState(true)
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);

    useEffect(() => {
        done_setting_admin_to_master == true && setcanSubmit(true) && resetIsDone("done_setting_admin_to_master")
    }, [done_setting_admin_to_master])
    const {name,isMaster,id}=user
    const TYPE = isMaster ? "MASTER":"REGULAIRE"

    return <List.Accordion
    title={`${name} (${TYPE})` }
    titleStyle={styles.Title}
    style={{
        ...styles.AcordionHeader,
        borderBottomLeftRadius: !expanded ?12:0,
        borderBottomRightRadius:!expanded ?12:0 ,
        marginBottom: expanded ?0:16 ,
    }}
    descriptionStyle={styles.AcordionWrrapper}
    expanded={expanded}
    onPress={handlePress}
    >
           
      <View style={styles.accordionContentWrrapper} >
      {  !isMaster
           ?  <Button color="BLUE" disabled={!canSubmit} clickHandler={()=>{
            Alert.alert("Definition!", "Etes-vous sûr que vous voulez definir Master? ", [
                {
                  text: "Annuler",
                  onPress: () => null,
                  style: "cancel"
                },
                { text: "OUI", onPress: () =>{
                    setMaster({id,isMaster:true})
                    setcanSubmit(false)
                }
               }
              ]);
               
               }} >
                 <Text style={{color:'#fff',fontWeight:'bold'}}>definir  MASTER  </Text>
              </Button>
            :  <Button color="BLUE" disabled={!canSubmit} clickHandler={()=>{
                Alert.alert("Definition!", "Etes-vous sûr que vous voulez definir regulaire? ", [
                    {
                      text: "Annuler",
                      onPress: () => null,
                      style: "cancel"
                    },
                    { text: "OUI", onPress: () =>{
                        setMaster({id,isMaster:false})
                        setcanSubmit(false)
                    }
                   }
                  ]);
              
               }} >
                 <Text style={{color:'#fff',fontWeight:'bold'}}>definir REGULIARE  </Text>
              </Button>
      }

      </View>
</List.Accordion>
}

 
export default  AdminItem 

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
})


