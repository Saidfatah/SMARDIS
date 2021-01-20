import React,{useState} from 'react'
import {Text} from 'react-native'
import GuestItem from './GuestItem'
import { List } from 'react-native-paper';
import {colors} from '../Common/Colors'
import Button from '../Common/Button'


const  GuesItems = ({items,guestId,removeGuestItem,validateGuestOrder,updateQuantity,name})=> {
     const [expanded, setExpanded] = useState(true);
     const handlePress = () => setExpanded(!expanded);
    return (  <List.Accordion
                title={name}
                titleStyle={{color:colors.BLACK,fontWeight:'bold'}}
                expanded={expanded}
                onPress={handlePress}>
                {
                items.map((item,i)=><GuestItem  key={i} {...{guestId,updateQuantity,removeGuestItem,item}} />)
                }
                <Button color={"BLUE"} clickHandler={e=>validateGuestOrder({guestId})}>
                    <Text style={{color:"#fff",textAlign:'center'}}>Valider</Text>
                </Button>
    </List.Accordion>
    )
}

export default GuesItems
