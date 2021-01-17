import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { connect } from 'react-redux'
import DistributorStackNavigator from './DistributorStackNavigator'
import AdminStackNavigator from './AdminStackNavigator'
import {Login} from './Screens'
const RouteStack     = createStackNavigator()
 
const Navigator =({authenticated,userType})=>{
    return <NavigationContainer >
       <RouteStack.Navigator screenOptions={{headerShown:false}} initialRouteName={authenticated?userType+'DashBoard':'LOGIN'}>
             <RouteStack.Screen name="ADMINDashBoard"  component={AdminStackNavigator} />
             <RouteStack.Screen name="DISTRIBUTORDashBoard" component={DistributorStackNavigator} />
             <RouteStack.Screen name="LOGIN" component={Login} />
       </RouteStack.Navigator>
    </NavigationContainer>
}

export default connect(
    state=>({
        authenticated:state.auth.authenticated,
        userType:state.auth.userType,
    }),
    null
)(Navigator)
