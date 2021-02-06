import React,{useState} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { List } from 'react-native-paper';
import {colors} from '../../../Common/Colors'
import Button from '../../../Common/Button'


export const WaitingItem = ({user,approveUser,rejectUser}) => {
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);
    const {type,name,id}=user
    const TYPE = type =="ADMIN" ? "Admin":"Vendeur"

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
           <View style={styles.HFlex} >
              <Button color="GREEN" clickHandler={()=>approveUser(id)} >
                 <Text style={{color:'#fff',fontWeight:'bold'}}>Approuver </Text>
              </Button>
              <Button color="GREEN" clickHandler={()=>approveUser(id)} >
                 <Text style={{color:'#fff',fontWeight:'bold'}}>rejeter  </Text>
              </Button>
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
})


