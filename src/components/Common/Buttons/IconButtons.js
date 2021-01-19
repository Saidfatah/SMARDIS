import { View } from 'native-base'
import React from 'react'
import {TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import {colors} from '../../Common/Colors'

const IconButtons=({icon , clickHandler } )=> {
    let ICON 
    if(icon=='REMOVE') ICON ='trash'
    if(icon=='LIST') ICON ='list'

    return (
        <TouchableOpacity onPress={clickHandler}>
             <View style={{backgroundColor:colors.RED,borderRadius:12,padding:4}} >
                <Icon type="font-awesome" color={'#fff'}  name="trash" size={30} />
             </View>
        </TouchableOpacity>
    )
}

export default IconButtons
