import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { connect } from 'react-redux'
import DistributorStackNavigator from './DistributorStackNavigator'
import AdminStackNavigator from './AdminStackNavigator'
import {Login,Authorizer} from './Screens'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerNavigator/DrawerContent'

const RouteStack     = createStackNavigator()
const Drawer = createDrawerNavigator();
const Navigator =({authenticated,userType})=>{
    return <NavigationContainer >
       <Drawer.Navigator 
       screenOptions={{headerShown:false}} 
       initialRouteName="AUTHORIZER"
       drawerContent={props => <DrawerContent {...props} />}
       >
             <Drawer.Screen name="ADMINDashBoard"  component={AdminStackNavigator} />
             <Drawer.Screen name="DISTRUBUTORDashBoard" component={DistributorStackNavigator} />
             <Drawer.Screen name="LOGIN" component={Login} />
             <Drawer.Screen name="AUTHORIZER" component={Authorizer} />
       </Drawer.Navigator>
    </NavigationContainer>
}

export default connect(
    state=>({
        authenticated:state.auth.authenticated,
        userType:state.auth.userType,
    }),
    null
)(Navigator)
