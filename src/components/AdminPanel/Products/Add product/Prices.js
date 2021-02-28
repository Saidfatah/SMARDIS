import React  from 'react'
import {View} from 'react-native'
import Label from '../../../Common/Label'
import Error from '../../../Common/Error'
import { colors } from '../../../Common/Colors'
import NumericInput from 'react-native-numeric-input'

const Prices=({price1, price2,price3,price4,handelChange,ERRORS_MESSAGES,errors})=> {
    return (
        <View>
        <View>
         <Label label="Prix 1" mga={16}/>
         <Error trigger={errors.price1REQUIRED} error={ERRORS_MESSAGES[0].message} />
     
          <NumericInput 
           iconSize={30}
           minValue={0}
           validateOnBlur={true}
           step={1}
           valueType="real"
           value={ price1} 
           initValue={ price1} 
           containerStyle={{borderRadius:12,borderColor:colors.BLACK,}}
           inputStyle={{ borderColor:colors.BLACK,}}
           iconStyle={{ color:colors.BLACK, }}
           leftButtonBackgroundColor="transparent"
           rightButtonBackgroundColor="transparent"
           onChange={handelChange('price1')} 
           />
     </View>
        <View>
         <Label label="Prix 2" mga={16}/>
         <Error trigger={errors.price2REQUIRED} error={ERRORS_MESSAGES[0].message} />
         <NumericInput 
           iconSize={30}
           minValue={0}
           step={1}
           valueType="real"
           value={price2}
           initValue={ price2}  
           containerStyle={{  borderRadius:12,  borderColor:colors.BLACK,
           }}
           inputStyle={{ borderColor:colors.BLACK,  }}
            iconStyle={{color:colors.BLACK, }}
           leftButtonBackgroundColor="transparent"
           rightButtonBackgroundColor="transparent"
           onChange={handelChange('price2')} 
           />
     </View>
        <View>
         <Label label="Prix 3" mga={16}/>
         <Error trigger={errors.price3REQUIRED} error={ERRORS_MESSAGES[0].message} />
         <NumericInput 
           iconSize={30}
           minValue={0}
           step={1}
           valueType="real"
           value={price3} 
           initValue={price3} 
           containerStyle={{  borderRadius:12,  borderColor:colors.BLACK,
           }}
           inputStyle={{ borderColor:colors.BLACK,  }}
            iconStyle={{color:colors.BLACK, }}
           leftButtonBackgroundColor="transparent"
           rightButtonBackgroundColor="transparent"
           onChange={handelChange('price3')} 
           />
     </View>
        <View>
         <Label label="Prix 4" mga={16}/>
         <Error trigger={errors.price4REQUIRED} error={ERRORS_MESSAGES[0].message} />
         <NumericInput 
           iconSize={30}
           minValue={0}
           step={1}
           valueType="real"
           value={price4} 
           initValue={price4} 
           containerStyle={{  borderRadius:12,  borderColor:colors.BLACK,
           }}
           inputStyle={{ borderColor:colors.BLACK,  }}
            iconStyle={{color:colors.BLACK, }}
           leftButtonBackgroundColor="transparent"
           rightButtonBackgroundColor="transparent"
           onChange={handelChange('price4')} 
           />
     </View>
     </View>
    )
}

export default Prices
