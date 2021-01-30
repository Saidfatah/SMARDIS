import React from 'react'
import {Text} from 'react-native'
import {colors} from './Colors'

const Label=({label,color,mgb,mga,mgl,mgr})=> {
    return  <Text style={{
     color:color || colors.BLACK,
     fontSize:16,
     marginBottom:mgb||8,
     marginTop:mga||0,
     marginLeft:mgl || 0,
     marginRight:mgr || 0,
    }}> 
    {label} 
    </Text>
     
}

export default Label
