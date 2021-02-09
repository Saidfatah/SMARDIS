import React,{useState,useEffect} from 'react'
import {Text,View} from 'react-native'
import GuestItem from './GuestItem'
import { List } from 'react-native-paper';
import {colors} from '../Common/Colors'
import Badge from '../Common/Badge'
import Button from '../Common/Button'


const  GuesItems = ({navigation,items,guestId,removeGuestItem,done_validating_product,resetIsDone,validateGuestOrder,updateQuantity,name,sector})=> {
     const [expanded, setExpanded] = useState(true);
     const [canValidate, setcanValidate] = useState(true)

     useEffect(() => {
         done_validating_product == true && setcanValidate(true) && resetIsDone("done_validating_product")
     }, [done_validating_product])

     const handlePress = () => setExpanded(!expanded);

     const TOTAL= items.reduce((a,c)=>a+(c.price1*c.quantity),0)
     return (  <List.Accordion
                 title={<View style={{ flex:1, display:'flex', flexDirection:'row', width : '100%', justifyContent:'space-between'}}>
                    <Text>{name}</Text>
                    <Badge status={"success"} value={(TOTAL).toString()+" DH"} textStyle={{ fontSize:14 }} containerStyle={{marginLeft:16}} badgeStyle={{ height:24  }}/>
                </View>}
                 titleStyle={{color:colors.BLACK,fontWeight:'bold'}}
                 expanded={expanded}
                 onPress={handlePress}>
                 {
                 items.map((item,i)=><GuestItem  key={i} {...{guestId,updateQuantity,removeGuestItem,item}} />)
                 }
                 <Button color={"BLUE"}  disabled={!canValidate} clickHandler={e=>{
                     setcanValidate(false)
                     validateGuestOrder({guestId,sector,status:"PAID",navigation})
                     navigation.navigate('DISTRIBUTORvalidtedCommands')
                 }}>
                     <Text style={{color:"#fff",textAlign:'center'}}>Valider</Text>
                 </Button>
     </List.Accordion>
     )
}

export default GuesItems
