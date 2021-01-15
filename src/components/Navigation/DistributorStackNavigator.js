import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {
    DistrubutorCart,
    DistrubutorCatalogue,
    DistrubutorClientDelivry,
    DistrubutorSectors,
    DistrubutorTodaysOrders,
    DistrubutorDashBoard
} from './Screens'

const DistributorStack = createStackNavigator()

const DistributorStackNavigator =()=>{
    return <DistributorStack.Navigator initialRouteName={'DISTRIBUTORDashBoard'}>
             <DistributorStack.Screen name="DISTRIBUTORDashBoard" component={DistrubutorDashBoard} />
             <DistributorStack.Screen name="DISTRIBUTORtodaysOrders" component={DistrubutorTodaysOrders} />
             <DistributorStack.Screen name="DISTRIBUTORsectors" component={DistrubutorSectors} />
             <DistributorStack.Screen name="DISTRIBUTORclientDelivery" component={DistrubutorClientDelivry} />
             <DistributorStack.Screen name="DISTRIBUTORcatalogue" component={DistrubutorCatalogue} />
             <DistributorStack.Screen name="DISTRIBUTORcart" component={DistrubutorCart} />
    </DistributorStack.Navigator>
}

export default DistributorStackNavigator
