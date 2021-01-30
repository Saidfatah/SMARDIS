import React,{useState,createRef} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { List } from 'react-native-paper';
import {colors} from '../../Common/Colors'
import ClientItem from '../Clients/Clients List/ClientItem'
import Badge from '../../Common/Badge'
import Button from '../../Common/Button'
import Item from '../../Common/Item'


const  SectorItem=({index,navigation,sector,clients,expandedIndex,setexpandedIndex})=> {
    const handlePress = () => setexpandedIndex(index == expandedIndex ? -1 : index);
    const {name,id}=sector
     
    const sectorClients = [...clients].filter(cl=>cl.sectorId == id)

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
              status={sectorClients.length >0 ?"success":"warning"}
              value={(sectorClients.length).toString()}
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
            borderBottomLeftRadius: !expandedIndex == index ?12:0,
            borderBottomRightRadius:!expandedIndex == index ?12:0 ,
            marginBottom: expandedIndex == index ?0:16 ,
        },
        descriptionStyle:styles.AcordionWrrapper,
        expanded:expandedIndex == index,
        onPress:handlePress
    }
    return (
        <List.Accordion  {...ACCORDION_PROPS} >
          <View style={styles.accordionContentWrrapper}>
          <View style={{display:'flex',flexDirection:"row"}}>
                     <Button color="BLUE" xStyle={{flex:1}} clickHandler={()=>{
                         navigation.navigate('ADMINupdateSector',{update:true,sector})
                     }}>
                         <Text style={{color:'#fff',textAlign:'center'}}>Modifier </Text>
                     </Button>
                     <Button color="BLUE" xStyle={{flex:1}} clickHandler={()=>{
                         navigation.navigate('ADMINupdateSector',{update:true})
                     }}>
                         <Text style={{color:'#fff',textAlign:'center'}}>supprimer</Text>
                     </Button>
           </View>
           {
           sectorClients.map((sCl,index)=><ClientItem  key={index}  navigation={navigation} client={sCl}  />)
           }  
          </View>
    </List.Accordion>
    )
}

export default SectorItem
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

