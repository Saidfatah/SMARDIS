import React,{useState,createRef,useMemo} from 'react'
import {View,Text,StyleSheet } from 'react-native'
import { List } from 'react-native-paper';
import {colors} from '../../Common/Colors'
import ClientItem from '../../AdminPanel/Clients/Clients List/ClientItem'
import Badge from '../../Common/Badge'
import {connect} from 'react-redux'
import ClientItems from './ClientsItems'



const SectorItem=({sector,clients,orderId,navigation,currentSector,currentSectorIndex,currentTurn})=> {
        const [expanded, setexpanded] = useState(false)
        const {name,id}=sector
    
        
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
                  status={clients.length >0 ?"success":"warning"}
                  value={(clients.length).toString()}
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
                borderBottomLeftRadius: !expanded  ?12:0,
                borderBottomRightRadius:!expanded  ?12:0 ,
                marginBottom: expanded ?0:16 ,
            },
            descriptionStyle:styles.AcordionWrrapper,
            expanded:expanded ,
            onPress:()=>setexpanded(!expanded)
        }
        
   

      
        return <List.Accordion  {...ACCORDION_PROPS} >
              <View style={styles.accordionContentWrrapper}>  
               <ClientItems {...{clients,navigation,sector,currentTurn,currentSectorIndex,currentSector,orderId}}/>  
              </View>
        </List.Accordion>
}

export default  connect(
    state=>({
        currentTurn   : state.scheduel.currentTurn ,
        currentSector : state.scheduel.currentSector,
        currentSectorIndex : state.scheduel.currentSectorIndex,
    }),
    null
)(SectorItem)

  
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

