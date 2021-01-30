import React,{useState,createRef} from 'react'
import {View,Text,FlatList,StyleSheet , TouchableOpacity} from 'react-native'
import { List } from 'react-native-paper';
import {colors} from '../../Common/Colors'
import ClientItem from '../../AdminPanel/Clients/Clients List/ClientItem'
import Badge from '../../Common/Badge'
import Item from '../../Common/Item'

// import Animated, {useAnimatedStyle} from 'react-native-reanimated';
// import {bin,mix,useTiming} from 'react-native-redash' 
// const {interpolate,not}=Animated


const SectorItem=({sector,clients,orderId,navigation})=> {
        const [expanded, setexpanded] = useState(false)
        const navigateToRoute=(clientId,client)=>navigation.navigate('DISTRIBUTORclientDelivery', { clientId ,client ,sector,orderId });
        const {name}=sector
    

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
        return (
            <List.Accordion  {...ACCORDION_PROPS} >
              <View style={styles.accordionContentWrrapper}>  
               {
               clients.map((sCl,index)=><ClientItem 
                    isInTodaysOrders={true}
                    key={index} 
                    navigation={navigation} 
                    client={sCl} 
                    onclick={()=>{
                        if(sCl.turn) return navigateToRoute(sCl.id,sCl)
                        console.log('not your turn , sho message here')
                    }} 
                    />)
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

