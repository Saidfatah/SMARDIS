import React from 'react'
import {Image} from 'react-native'
import load from '../../images/load.gif'

const Loading=({height})=> {
    return <Image  style={{width:height?height:100,height:height?height:100}} source={load} />
}

export default Loading
