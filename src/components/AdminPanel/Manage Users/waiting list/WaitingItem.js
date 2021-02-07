import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { List } from 'react-native-paper';
import {colors} from '../../../Common/Colors'
import Button from '../../../Common/Button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export const WaitingItem = ({user,approveUser,rejectUser,resetIsDone,done_rejecting_client,done_approving_client}) => {
    const [canSubmit, setcanSubmit] = useState(true)
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);
    const {type,name,id}=user
    const TYPE = type =="ADMIN" ? "Admin":"Vendeur"
    useEffect(() => {
        if(done_rejecting_client ){
            setcanSubmit(true)
            resetIsDone("done_rejecting_client")
        }
        if(done_approving_client ){
            setcanSubmit(true)
            resetIsDone("done_approving_client")
        }
    }, [done_rejecting_client,done_approving_client])

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
          <View style={styles.HFlex} >
              <Button xStyle={styles.xButton} disabled={!canSubmit} color="GREEN" clickHandler={()=>{
                  approveUser(id)
                  setcanSubmit(false)
                  }} >
                  <Icon style={styles.icon} size={20} name="account-check" />
                  <Text style={styles.text}>Approuver </Text>
              </Button>
              <Button  xStyle={styles.xButton}  disabled={!canSubmit}  color="RED" clickHandler={()=>{
                  rejectUser(id)
                  setcanSubmit(false)
                  
                  }} >
                 <Icon style={styles.icon} size={20} name="account-cancel-outline" />
                 <Text style={styles.text}>rejeter  </Text>
              </Button>
           </View>
          </View>

</List.Accordion>
}

 
export default  WaitingItem 

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
    xButton:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        padding:8
    },
    icon:{color:'#fff',marginRight:8},
    text:{color:'#fff',fontWeight:'bold'}
})


