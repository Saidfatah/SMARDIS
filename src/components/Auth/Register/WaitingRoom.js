import React from 'react'
import {View,Text} from 'react-native'
import BackgroundImage from '../../Common/BackgroundImage'

const WaitingRoom=({navigation,route})=> {
    return (
        <BackgroundImage>
            <View>
                <Text>Attender L'approval du L'admin </Text>
            </View>
        </BackgroundImage>
    )
}

export default WaitingRoom
