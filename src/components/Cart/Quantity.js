import  React from 'react'
import { StyleSheet,Text,TouchableHighlight,View} from 'react-native'
import {colors} from '../Common/Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Quantity=({quantity,guestId,itemId,updateQuantity})=> {

    const onQuanitityChange=(increment)=>(e)=>{
        let newQuantity = quantity
        if(quantity + increment <0) newQuantity=0
        else  newQuantity +=increment
       
       updateQuantity({guestId,itemId,quantity:newQuantity})
    }
    return  <View style={styles.flex} >
         <View>
             <TouchableHighlight onPress={onQuanitityChange(-1)}  >
                 <View style={{
                     ...styles.btn,
                     borderTopLeftRadius:12,
                     borderBottomLeftRadius:12,
                 }} >
                    <Icon size={15} name="minus" color={colors.BLACK} />
                 </View>
             </TouchableHighlight>
         </View>
         <Text style={styles.text} >
             {quantity}
         </Text>
         <View>
            <TouchableHighlight onPress={onQuanitityChange(1)} >
                <View style={{
                    ...styles.btn,
                    borderTopRightRadius:12,
                    borderBottomRightRadius:12,
                }} >
                   <Icon size={15} name="plus" color={colors.BLACK} />
                </View>
            </TouchableHighlight>
         </View>
    </View>
}


export default Quantity

var styles = StyleSheet.create({
    flex:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
   },
   btn:{
       backgroundColor:colors.RED,
       padding:8,
     
   },
   text:{
       fontWeight:'bold',
       textAlign:'center',
       padding:8,
   }
 });
