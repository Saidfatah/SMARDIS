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
import {View,Text} from 'react-native'
import { connect } from 'react-redux'
const DistributorStack = createStackNavigator()

const CustomHeader = ({cartItems})=>{
   return <View>
     <Text>hey</Text>
     <Text>{cartItems}</Text>
   </View>
}

const DistributorStackNavigator =({cartGuests})=>{
    return <DistributorStack.Navigator initialRouteName={'DISTRIBUTORDashBoard'}>
             <DistributorStack.Screen 
                name="DISTRIBUTORDashBoard" 
                options={{headerTitle:'DashBoard'}} 
                component={DistrubutorDashBoard} />
             <DistributorStack.Screen 
                name="DISTRIBUTORtodaysOrders" 
                component={DistrubutorTodaysOrders} />
             <DistributorStack.Screen 
                name="DISTRIBUTORsectors" 
                component={DistrubutorSectors} />
             <DistributorStack.Screen 
                name="DISTRIBUTORclientDelivery" 
                options={{ 
                   headerTitle: props => <CustomHeader {...props} cartItems={cartGuests.length} /> }}
                component={DistrubutorClientDelivry} />
             <DistributorStack.Screen 
                name="DISTRIBUTORcatalogue" 
                component={DistrubutorCatalogue} />
             <DistributorStack.Screen 
                name="DISTRIBUTORcart" 
                component={DistrubutorCart} />
    </DistributorStack.Navigator>
}

export default connect(
   state=>({
      cartGuests : state.cart.cartGuests
   }),
   null
)(DistributorStackNavigator)
