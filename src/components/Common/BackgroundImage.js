import React from 'react'
import { ImageBackground} from 'react-native'

const BackgroundImage=({children})=> {
    return (
        <ImageBackground imageStyle={{flex:1}}  source={require('../../images/blueGradiant.jpeg')} style={{width: '100%', height: '100%',padding:0}}>
         {children}
        </ImageBackground>
    )
}

export default BackgroundImage
