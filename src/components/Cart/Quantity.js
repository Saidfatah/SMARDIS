import  React,{createRef,useEffect,useState} from 'react'
import { StyleSheet,Text,TouchableHighlight,View} from 'react-native'
import {colors} from '../Common/Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Quantity=({quantity,guestId,itemId,updateQuantity})=> {
    const [quantityLocal, setquantityLocal] = useState(quantity)
    const ref =createRef()

    // useEffect(() => {
    //     let mounted = true 
    //     if(mounted){
    //         ref.current+=1
    //         console.log({quantity,mounted})
    //         setquantityLocal(quantity)
    //     }
       
    //     return ()=>mounted = false
    // }, [quantity])
    
    const onQuanitityChange=(increment)=>(e)=>{
        console.log(increment)
       let newQuantity = quantity
       if(quantity +increment <0) newQuantity=0
       updateQuantity(newQuantity)
    }
    return  <View styles={styles.flex} >
         <TouchableHighlight onPress={onQuanitityChange(-1)}  >
             <View style={{
                 ...styles.btn,
                 borderTopLeftRadius:12,
                 borderBottomLeftRadius:12,
             }} >
                <Icon nam="minus" color={colors.BLACK} />
             </View>
         </TouchableHighlight>
         <Text style={styles.text} >
             {quantity}
         </Text>
         <TouchableHighlight onPress={onQuanitityChange(1)} >
             <View style={{
                 ...styles.btn,
                 borderTopRightRadius:12,
                 borderBottomRightRadius:12,
             }} >
                <Icon nam="plus" color={colors.BLACK} />
             </View>
         </TouchableHighlight>
    </View>
}


export default Quantity

var styles = StyleSheet.create({
    flex:{
        marginBottom:8,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
   },
   btn:{
       backgroundColor:colors.RED,
       padding:8,
       display:'flex',
       justifyContent:'center',
       alignItems:'center'
   },
   text:{
       fontWeight:'bold'
   }
 });
