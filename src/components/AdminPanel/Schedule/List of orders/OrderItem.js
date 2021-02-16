import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { List } from 'react-native-paper';
import {colors} from '../../../Common/Colors'
import Badge from '../../../Common/Badge'
import Label from '../../../Common/Label'
import Button from '../../../Common/Button'

export const OrderItem = ({order,navigation,selectBill,validated}) => {
    const [expanded, setExpanded] = useState(false);

    const handlePress = () => setExpanded(!expanded);
    const { distrubutor ,client ,sector,scheduleId,turn ,total ,products,created_at,billRef,status,note,sale_date ,sale_hour}=order
    


    let STATUS ="pase enour"
    if(status =="VALIDATED") STATUS ="valider"
    if(status =="PENDING") STATUS ="pase enou"
    if(status =="CANCELED") STATUS ="anuller"
    
    const IS_VALIDATED = validated?true : (status =="VALIDATED" ?true:false)
    
   
    if(IS_VALIDATED)
    return (
        <List.Accordion
         title={`${distrubutor.name} (${sector.name})` }
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
                    <Label label="Client :"  mga={16} />
                    <View style={{...styles.FieldItem,marginBottom:0,marginLeft:8}}>
                              <Text>{client.name}</Text>
                    </View>
                </View>
                <View style={styles.HFlex} >
                    <Label label="RefClient :"  mga={16} />
                    <View style={{...styles.FieldItem,marginBottom:0,marginLeft:8}}>
                              <Text>{client.ref}</Text>
                    </View>
                </View>
                <View style={styles.HFlex} >
                    <Label label="RefFacteur :"  mga={16} />
                    <View style={{...styles.FieldItem,marginBottom:0,marginLeft:8}}>
                              <Text>{billRef}</Text>
                    </View>
                </View>
                <View style={styles.HFlex} >
                    <Label label="Status :"  mga={16} />
                    <View style={{...styles.FieldItem,marginBottom:0,marginLeft:8}}>
                              <Text>{STATUS}</Text>
                    </View>
                </View>
                <View style={styles.HFlex} >
                    <Label label="Note :"  mga={16} />
                    <View style={{...styles.FieldItem,marginBottom:0,marginLeft:8}}>
                              <Text>{note}</Text>
                    </View>
                </View>
              
                <View style={styles.HFlex} >
                    <Label label="Secteur :"  mga={16} />
                    <View style={{...styles.FieldItem,marginBottom:0,marginLeft:8}}>
                         <Text>{sector.name}</Text>
                    </View>
                </View>
                
           
                {
                    products.length>1
                    ? <>
                    <Label label="Liste des produits ventes "  mga={16} />
                    <View style={styles.productsWrapper}>
                          <View style={styles.HFlex} >
                                 <Label label="Produits :"  mga={16} />
                                 <View  style={{...styles.FieldItem,marginBottom:0,marginLeft:8}}>
                                 <Badge value={products.lenght} status="primary" />
                                 </View>
                         </View>
                        {
                         products.map((product,i)=><View key={i} style={styles.orderProducts}>
                                 <Text>{"titre :"+product.name}</Text>
                                 <Text>{"ref :"+product.ref}</Text>
                                 <Text>{"quantity :"+product.quantity}</Text>
                                 <View style={styles.HFlex} >
                                   <Label label="Total :"  mga={16} />
                                   <View  style={{...styles.FieldItem,marginBottom:0,marginLeft:8}}>
                                   <Badge value={product.priceForClient * product.quantity} status="primary" />
                                   </View>
                                </View>
                                 
                           </View>)
                        }
                        
                    </View>
                    </>
                    :null
                }
                <View style={styles.HFlex} >
                   <Label label="Total :"  mga={16} />
                   <View  style={{...styles.FieldItem,marginBottom:0,marginLeft:8}}>
                        <Badge value={products.reduce((a,c)=>a+(c.price1*c.quantity),0)} status="primary" /> 
                   </View>
                </View>
              
                <Button 
                 xStyle={{margin:0,borderRadius:12,marginTop:16}} 
                 color={"BLUE"} 
                 clickHandler={e=>{
                    selectBill({id:order.id,distrubutor:false})
                    navigation.navigate('BillTable')
                }} >
                    <Text style={{color:'#fff',textAlign:'center'}} >Bon de command</Text>
                </Button>
                
           </View>
     </List.Accordion>
    )

    return (
        <List.Accordion
         title={`${distrubutor.name} (${sector.name})` }
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
                    <Label label="Client :"  mga={16} />
                    <View style={{...styles.FieldItem,marginBottom:0,marginLeft:8}}>
                              <Text>{client.name}</Text>
                    </View>
                </View>
                <View style={styles.HFlex} >
                    <Label label="RefClient :"  mga={16} />
                    <View style={{...styles.FieldItem,marginBottom:0,marginLeft:8}}>
                              <Text>{client.ref}</Text>
                    </View>
                </View>
                <View style={styles.HFlex} >
                    <Label label="Status :"  mga={16} />
                    <View style={{...styles.FieldItem,marginBottom:0,marginLeft:8}}>
                              <Text>{STATUS}</Text>
                    </View>
                </View>
                <View style={styles.HFlex} >
                    <Label label="Note :"  mga={16} />
                    <View style={{...styles.FieldItem,marginBottom:0,marginLeft:8}}>
                              <Text>{note}</Text>
                    </View>
                </View>
              
                <View style={styles.HFlex} >
                    <Label label="Secteur :"  mga={16} />
                    <View style={{...styles.FieldItem,marginBottom:0,marginLeft:8}}>
                         <Text>{sector.name}</Text>
                    </View>
                </View>
           </View>
     </List.Accordion>
    )
}
export default  OrderItem 

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
    productItem: {
        display:'flex',
        flexDirection:'row',
        padding:8,
        backgroundColor:'#fff',
        elevation:5,
        borderRadius:12,
        marginRight:8,
        marginBottom:8,
    },
    FieldItem: {
        display:'flex',
        flexDirection:'row',
        padding:8,
        backgroundColor:'#fff',
        elevation:5,
        borderRadius:12,
        marginRight:8,
        marginBottom:8,
    },
    orderProducts: {
        display:'flex',
        padding:8,
        backgroundColor:'#fff',
        elevation:5,
        borderRadius:12,
        marginRight:8,
        marginBottom:8,

    },
    productsWrapper: {
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

