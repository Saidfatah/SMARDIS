import React,{useState} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { List } from 'react-native-paper';
import {colors} from '../../Common/Colors'
import Badge from '../../Common/Badge'
import Label from '../../Common/Label'


export const SaleItem = ({sale}) => {
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);
  
    const {client,distrubutor,product,sector,billRef,total}= sale

    return (
        <List.Accordion
         title={`${client.name} (${sector.name})` }
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
                    <Label label="Facetru refrence :"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                              <Text>{billRef}</Text>
                    </View>
                </View>
          
                <View style={styles.HFlex} >
                    <Label label="Vendeur:"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                              <Text>{distrubutor.name}</Text>
                    </View>
                </View>
                <View style={styles.HFlex} >
                    <Label label="Client:"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                              <Text>{client.name}</Text>
                    </View>
                </View>
                <View style={styles.HFlex} >
                    <Label label="Refernce du client:"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                              <Text>{client.ref}</Text>
                    </View>
                </View>
                <View style={styles.HFlex} >
                    <Label label="Produit:"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                              <Text>{product.name}</Text>
                    </View>
                </View>
                <View style={styles.HFlex} >
                    <Label label="Quantité du Produit:"  mga={16} />
                    <View style={{...styles.ClientItem,marginBottom:0,marginLeft:8}}>
                              <Text>{product.quantity}</Text>
                    </View>
                </View>
          
                <View style={styles.HFlex} >
                    <Label label="Montante paye:"  mga={16} />
                    <View style={{
                        ...styles.ClientItem,
                        marginBottom:0,
                        marginLeft:8,
                        backgroundColor:colors.GREEN
                        }}>
                              <Text style={{
                                  color:'#333',
                                  fontWeight:'bold'}} >
                              {total} DH
                            </Text>
                    </View>
                </View>
          
               
       
             
           </View>
     </List.Accordion>
    )
}
export default  SaleItem 

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

