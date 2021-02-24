import React,{useState} from 'react'
import {View,Text,TextInput,StyleSheet} from 'react-native'
import Button from '../../../Common/Button'
import {colors} from '../../../Common/Colors'
 import NumericInput from 'react-native-numeric-input'


const ProductAddToCart =({scheduelId,setIsPanelActive,selectedProduct,guest,addCartItem,sector,client})=> {
    const [quantity, setquantity] = useState(1)
    const onChangeHandler =(text) =>setquantity(parseInt(text))
    const {price1} = selectedProduct
    const priceForClient =selectedProduct[client.price.replace('x','ce')] || price1

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
                  value={quantity} 
                  onChange={value => setquantity(value)} 
                  />
             </View>
             <View style={styles.InputGroup}>
                 <Text style={styles.label}>Total en DH</Text>
                 <TextInput 
                    style={styles.input}
                   value={(priceForClient*quantity).toString()}
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