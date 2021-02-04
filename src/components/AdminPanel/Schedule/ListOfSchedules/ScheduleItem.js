import React,{useState} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { List } from 'react-native-paper';
import {colors} from '../../../Common/Colors'
import Badge from '../../../Common/Badge'
import Label from '../../../Common/Label'

export const ScheduleItem = ({scheduel}) => {
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);
    const {admin,distrubutor,distination,status,date} = scheduel

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
                              <Text>{date.toLocaleDateString('en-US')}</Text>
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
           </View>
     </List.Accordion>
    )
}
 

export default  ScheduleItem 

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

