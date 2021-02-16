import React from 'react'
import Image from 'react-native-fast-image'
const Logo=({width,height})=> {
    return   <Image 
    style={{
        width:width || 50,
        height : height || 50,
    }} 
    resizeMode="contain"
    source={require('../../images/logo.png')} 
    />
}

export default Logo
