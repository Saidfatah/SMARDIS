import React from 'react'
import  Image from 'react-native-fast-image'

const Loading=({spacing})=> {
    return <Image  
    style={{
        width:spacing?spacing:100,
        height :spacing ?spacing :100
    }} 
    source={require('../../images/load.gif')} 
    />
}

export default Loading
