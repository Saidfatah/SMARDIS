import React from 'react'
import Image from 'react-native-fast-image'
const Logo=({width,height})=> {
    return   <Image style={{width:width || 50,height : height || 50}} source={require('../../images/SMARDIS 1.png')} />
}

export default Logo
