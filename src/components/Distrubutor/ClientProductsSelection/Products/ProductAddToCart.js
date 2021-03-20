import React,{useState} from 'react'
import {View,Text,TextInput,StyleSheet} from 'react-native'
import Button from '../../../Common/Button'
import {colors} from '../../../Common/Colors'
import NumericInput from 'react-native-numeric-input'
import {Decimal} from 'decimal.js';

const ProductAddToCart =({scheduelId,setIsPanelActive,selectedProduct,guest,addCartItem,sector,client})=> {
    const [quantity, setquantity] = useState(1)
    const onChangeHandler =(text) =>setquantity(parseInt(text))
    const {price1,discount} = selectedProduct

    let  priceForClient =(selectedProduct[client.price.replace('x','ce')] || price1)
    //if discount <1 it means the product has discount 
    if(discount > 0){
       priceForClient= discount
    }

    const total = new Decimal(priceForClient*quantity).toFixed(2)
    
    console.log({total})
 
    return (
        <View styles={styles.form}>
             <View style={styles.InputGroup}>
                 <Text style={styles.label}>Quantité</Text>
                 <NumericInput 
                  iconStyle={{color:colors.BLUE}}
                  iconSize={30}
                  minValue={0}
                  step={1}
                  valueType="real"
                  value={parseFloat(quantity)} 
                  onChange={v => setquantity(parseFloat(v).toFixed(2))} 
                  />
             </View>
             <View style={styles.InputGroup}>
                 <Text style={styles.label}>Total en DH</Text>
                 <TextInput 
                    style={styles.input}
                   value={total.toString()}
                   editable={false}
                   keyboardType="numeric"
                   onChangeText={onChangeHandler} 
                  />
             </View>
             <Button color={"BLUE"} clickHandler={e=>{
                 addCartItem({
                     guest,
                     product:{...selectedProduct,quantity ,priceForClient },
                     sector,
                     scheduelId
                    })
                 setIsPanelActive(false)
                 }} color='BLUE' >
                 <Text style={{color:'#fff' ,textAlign:'center'}}>Ajouter</Text>
             </Button>
        </View>
    )
}

export default ProductAddToCart
var styles = StyleSheet.create({
    input:{
        borderWidth:2,
        borderColor:colors.BLUE,
        color:colors.BLACK,
        width:'100%',
        borderRadius:12,
        paddingLeft:8
    },
    label:{
        fontSize:20,
        color:colors.BLACK,
      
    },
    InputGroup:{
        width:'100%',
        marginBottom:16,
    },

});