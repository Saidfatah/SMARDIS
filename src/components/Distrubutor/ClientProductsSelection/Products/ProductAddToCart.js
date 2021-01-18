import React,{useState} from 'react'
import {View,Text,TextInput,StyleSheet} from 'react-native'
import Button from '../../../Common/Button'
import {colors} from '../../../Common/Colors'
 import NumericInput from 'react-native-numeric-input'


const ProductAddToCart =({selectedProduct,guest,addCartItem})=> {
    const [quantity, setquantity] = useState(1)
    const onChangeHandler =(text) =>setquantity(parseInt(text))

    const {price} = selectedProduct

    return (
        <View styles={styles.form}>
             <View style={styles.InputGroup}>
                 <Text style={styles.label}>Quantité</Text>
                 <NumericInput 
                  iconStyle={{color:colors.BLUE}}
                  iconSize={25}
                  containerStyle={{width:'100%'}}
                  value={quantity} 
                  onChange={value => setquantity(value)} 
                  />
             </View>
             <View style={styles.InputGroup}>
                 <Text style={styles.label}>Total en DH</Text>
                 <TextInput 
                    style={styles.input}
                   value={(quantity*price).toString()}
                   keyboardType="numeric"
                   onChangeText={onChangeHandler} 
                  />
             </View>
             <Button color={"BLUE"} clickHandler={e=>addCartItem({guest,product:{selectedProduct}})} color='BLUE' >
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