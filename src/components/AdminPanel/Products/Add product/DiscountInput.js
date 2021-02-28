import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Label from '../../../Common/Label'
import {colors} from '../../../Common/Colors'
import NumericInput from 'react-native-numeric-input'

const DiscountInput=({discount,hasDiscount,dispatch})=> {
    return <View>
         <Label label="Promotion" mga={16} />
         <NumericInput 
         iconSize={30}
         minValue={0}
         step={10}
         valueType="real"
         value={discount} 
         initValue={discount} 
         containerStyle={{  
             borderRadius:12,  
             borderColor:colors.BLACK,
         }}
         inputStyle={{ borderColor:colors.BLACK }}
         iconStyle={{color:colors.BLACK, }}
         leftButtonBackgroundColor="transparent"
         rightButtonBackgroundColor="transparent"
         onChange={value=>dispatch({type:"SET_DISCOUNT",value})} 
         />
    </View>
    return (
         <View>
             
              <TouchableOpacity   onPress={()=>{dispatch({value:!hasDiscount,type:"SET_HAS_DISCOUNT"})}}>
                <View style={styles.planType}>
                    <Icon 
                         name={hasDiscount
                            ?"checkmark-circle"
                            :"checkmark-circle-outline"} 
                         size={20} 
                         color={colors.GREEN} 
                    />
                    <Text> Promotion </Text>
                </View>
               </TouchableOpacity>
               {
                   hasDiscount
                   ?<NumericInput 
                   iconSize={30}
                   minValue={0}
                   step={10}
                   valueType="real"
                   value={discount} 
                   initValue={discount} 
                   containerStyle={{  
                       borderRadius:12,  
                       borderColor:colors.BLACK,
                   }}
                   inputStyle={{ borderColor:colors.BLACK }}
                   iconStyle={{color:colors.BLACK, }}
                   leftButtonBackgroundColor="transparent"
                   rightButtonBackgroundColor="transparent"
                   onChange={value=>dispatch({type:"SET_DISCOUNT",value})} 
                   />
                   :null
               }
         </View>
    )
}

export default DiscountInput


var styles = StyleSheet.create({
    Input:{
      padding:8 ,
      color:colors.BLACK,
      backgroundColor:'#fff',
      width:'100%',
      marginBottom:8,
      borderColor:colors.BLACK,
      borderWidth:2,
      borderRadius:12, 
    },
    ButtonText:{color:"#fff",textAlign:'center',fontWeight:'bold'},
    BtnXstyle:{
        flex:1,
        margin:0,
        borderRadius:12,
        display:'flex',
        flexDirection:'row',
        justifyContent:('center'),
        alignItems:'center'
    },
    container:{
        height:'100%',
        padding:8,
        backgroundColor:'#fff'
    },
    btns:{flex:1,display:'flex',flexDirection:'row',marginTop:16,marginBottom:16,justifyContent:'space-between'}
    ,planType:{
        backgroundColor:'#fff',
        borderRadius:50,
        flexDirection:'row',
        padding:4,
        margin:4,
    },
     
});
