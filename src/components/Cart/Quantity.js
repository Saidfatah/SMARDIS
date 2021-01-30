import  React,{createRef,useEffect,useState} from 'react'
import { StyleSheet} from 'react-native'
import NumericInput from 'react-native-numeric-input'
import {colors} from '../Common/Colors'


const Quantity=({quantity,guestId,itemId,updateQuantity})=> {
    const [quantityLocal, setquantityLocal] = useState(quantity)
    const ref =createRef()

    useEffect(() => {
        let mounted = true 
        if(mounted){
            ref.current+=1
            console.log({quantity,mounted})
            setquantityLocal(quantity)
        }
       
        return ()=>mounted = false
    }, [quantity])

    return <NumericInput 
            iconStyle={{
                color:"#fff",
                borderRadius:25
            }}
            iconSize={20}
            textColor={colors.BLACK}
            containerStyle={{backgroundColor:colors.RED,borderRadius:12}}
            borderColor={colors.RED}
            leftButtonBackgroundColor={"transparent"}
            rightButtonBackgroundColor={"transparent"}
            minValue={1}
            step={1}
            value={quantityLocal} 
            onChange={value => {
                updateQuantity({guestId,itemId,quantity:value  })
            }} 
    />
}


export default Quantity

var styles = StyleSheet.create({
    flex:{
        marginBottom:8,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
   }
 });
