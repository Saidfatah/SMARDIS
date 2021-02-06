import React,{useState} from 'react'
import {Text,StyleSheet} from 'react-native'
import { List } from 'react-native-paper';
import {colors} from '../../../Common/Colors'
import Button from '../../../Common/Button'


export const AdminItem = ({user,setMaster}) => {
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);
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
           
      {  !isMaster
           ?  <Button color="GREEN" clickHandler={()=>setMaster({id,isMaster:true})} >
                 <Text style={{color:'#fff',fontWeight:'bold'}}>definir  MASTER  </Text>
              </Button>
           :   <Button color="GREEN" clickHandler={()=>setMaster({id,isMaster:false})} >
                 <Text style={{color:'#fff',fontWeight:'bold'}}>definir REGULIARE  </Text>
              </Button>
      }

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


