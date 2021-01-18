import React from 'react'
import {View,Text} from 'react-native'
import Button from '../../Common/Button'
import BackgroundImage from '../../Common/BackgroundImage'

const DistrubutorDashBoard=({ navigation })=> {
    const navigateToRoute=(r)=>navigation.navigate(r)


    return <BackgroundImage>
        <Button clickHandler={()=>navigateToRoute('DISTRIBUTORtodaysOrders')}>   
            <Text> les mission d'aujourd'hui</Text>
        </Button>
        <Button clickHandler={()=>navigateToRoute('DISTRIBUTORsectors')}>  
            <Text>Les secteurs d'aujourd'hui </Text>
        </Button>
   </BackgroundImage> 
}

export default DistrubutorDashBoard
